import { AfterViewInit, Component, OnInit, Pipe, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../shared/models/Employe.model';
import { Router } from '@angular/router';
import { EmployesListModule } from '../../../shared/module/employes/employes-list/employes-list.module';

import { DatePipe, DecimalPipe } from '@angular/common';
import { EmployeEditDialogComponent } from '../../../shared/components/employe-edit-dialog/employe-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { EmployeDeleteDialogComponent } from '../../../shared/components/employe-delete-dialog/employe-delete-dialog.component';
import { EmployeeService } from '../../../shared/services/employee.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    EmployesListModule,
    NotifierModule,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'name', 'email', 'birthDate', 'basicSalary', 'status', 'group', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterUsername: string = '';
  filterGroup: string = '';

  constructor(private router: Router, private dialog: MatDialog, private notify: NotifierService, private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    // const dummyData: Employee[] = this.generateDummyEmployees(100);
    const saved = this.employeeService.savedFilter;
    this.filterUsername = saved.username;
    this.filterGroup = saved.group;

    this.employeeService.employee$.subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const [username, group] = filter.split('$');
      return data.username.toLowerCase().includes(username) && data.group.toLowerCase().includes(group);
    };

    this.applyFilter();


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter() {
    const username = this.filterUsername.trim().toLowerCase();
    const group = this.filterGroup.trim().toLowerCase();

    this.employeeService.savedFilter = {
      username: this.filterUsername,
      group: this.filterGroup
    };

    this.dataSource.filter = `${username}$${group}`;
  }

  addEmployee() {
    this.router.navigate(['/employes/add']);
  }

  editEmployee(employee: Employee) {

    const dialogRef = this.dialog.open(EmployeEditDialogComponent, {
      width: '700px',
      height: '400px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the employee data here
        const index = this.dataSource.data.findIndex(e => e.username === result.username);
        if (index > -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription(); // Refresh table

          this.notify.notify('warning', 'Update Employee Success');
        }
      }
    });
  }

  deleteEmployee(employee: Employee) {

    const dialogRef = this.dialog.open(EmployeDeleteDialogComponent, {
      width: '300px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Hapus data dari array 
        this.dataSource.data = this.dataSource.data.filter(e => e.username !== employee.username);

        this.notify.notify('error', 'Delete Employee Success');
      }
    });
  }

  toDetails(username: string) {
    this.router.navigate(['/employes', username])
  }

  onLog(param: any) {
    console.log(param)
  }
}
