import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { EmployeeService } from '../../../shared/services/employee.service';
import { Employee } from '../../../shared/models/Employe.model';
import { EmployesListModule } from '../../../shared/module/employes/employes-list/employes-list.module';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    EmployesListModule,
    DatePipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    console.log('usernamee', username)
    if (username) {
      const data = this.employeeService.getEmployeeByUsername(username);
      if (data) {
        this.employee = data;
      } else {
        this.location.back();
      }
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  }

  goBack(): void {
    this.location.back(); // agar tetap membawa state sebelumnya (termasuk filter/search)
  }
}
