import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployesListModule } from '../../../shared/module/employes/employes-list/employes-list.module';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    EmployesListModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {

  employeeForm!: FormGroup;
  groupOptions: string[] = [
    'Engineering', 'Marketing', 'HR', 'Finance', 'Support',
    'Product', 'Legal', 'IT', 'Sales', 'Admin'
  ];

  filteredGroups = this.groupOptions;
  groupFilterCtrl: any = null;

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) {
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

  dateNotInFutureValidator(control: any) {
    const today = new Date();
    if (new Date(control.value) > today) {
      return { max: true };
    }
    return null;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Employee data:', this.employeeForm.value);
      this.snackbar.open('Employee saved successfully!', 'Close', { duration: 3000 });
      this.router.navigate(['/employee']);
    }
  }

  onCancel() {
    this.router.navigate(['/employee']);
  }

  compareGroup(a: string, b: string): boolean {
    return a === b;
  }
}
