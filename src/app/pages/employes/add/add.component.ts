import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployesListModule } from '../../../shared/module/employes/employes-list/employes-list.module';
import { NgForOf, NgIf } from '@angular/common';
import { EmployeeService } from '../../../shared/services/employee.service';
import { NotifierModule, NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    EmployesListModule,
    NotifierModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {

  employeeForm!: FormGroup;
  statusOpt: string[] = ['Active', 'Inactive']
  groupOptions: string[] = [
    'Engineering', 'Marketing', 'HR', 'Finance', 'Support',
    'Product', 'Legal', 'IT', 'Sales', 'Admin'
  ];

  filteredGroups = this.groupOptions;
  groupFilterCtrl: any = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly employeeService: EmployeeService,
    private notify: NotifierService) {
    this.groupFilterCtrl = this.fb.control('')
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.dateNotInFutureValidator]],
      basicSalary: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.groupFilterCtrl.valueChanges.subscribe((value: any) => {
      this.filteredGroups = this.groupOptions.filter(g =>
        g.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  // validate date if greather than future
  dateNotInFutureValidator(control: any) {
    const today = new Date();
    if (new Date(control.value) > today) {
      return { max: true };
    }
    return null;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.notify.notify('success', 'Add New Employee Successfuly')

      console.log('Employee data:', this.employeeForm.value);
      this.employeeService.addEmployee(this.employeeForm.value)
      setTimeout(() => {
        this.router.navigate(['/employes/list']);
      }, 1000);
    }
  }

  onCancel() {
    this.router.navigate(['/employes/list']);
  }

  compareGroup(a: string, b: string): boolean {
    return a === b;
  }
}
