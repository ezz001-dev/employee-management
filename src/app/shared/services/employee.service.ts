import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/Employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeeSubject = new BehaviorSubject<Employee[]>([]);

  employee$ = this.employeeSubject.asObservable();

  constructor() {

    const groups = ['HR', 'IT', 'Finance', 'Sales', 'Marketing', 'QA', 'R&D', 'Admin', 'Support', 'Legal'];
    const status = ['Active', 'Inactive'];

    // Generate dummy data
    for (let i = 1; i <= 100; i++) {
      this.employees.push({
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        birthDate: new Date(1990, 0, i % 28 + 1),
        basicSalary: 5000000 + i * 10000,
        status: status[i % 2],
        group: groups[i % groups.length],
        description: `Employee number ${i}`
      });
    }
    this.employeeSubject.next(this.employees);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(employee: Employee) {
    this.employees.unshift(employee);
    this.employeeSubject.next(this.employees);
  }
}
