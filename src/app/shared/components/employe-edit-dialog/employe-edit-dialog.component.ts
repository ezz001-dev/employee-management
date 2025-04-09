import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/Employe.model';
import { EmployesListModule } from '../../module/employes/employes-list/employes-list.module';

@Component({
  selector: 'app-employe-edit-dialog',
  standalone: true,
  imports: [
    EmployesListModule
  ],
  templateUrl: './employe-edit-dialog.component.html',
  styleUrl: './employe-edit-dialog.component.scss'
})
export class EmployeEditDialogComponent {
  editedEmployee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.editedEmployee = { ...data };
  }

  onSave(): void {
    this.dialogRef.close(this.editedEmployee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
