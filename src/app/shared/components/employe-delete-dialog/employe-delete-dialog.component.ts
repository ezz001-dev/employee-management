import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/Employe.model';
import { EmployesListModule } from '../../module/employes/employes-list/employes-list.module';

@Component({
  selector: 'app-employe-delete-dialog',
  standalone: true,
  imports: [
    EmployesListModule
  ],
  templateUrl: './employe-delete-dialog.component.html',
  styleUrl: './employe-delete-dialog.component.scss'
})
export class EmployeDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
