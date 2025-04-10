import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListComponent as EmployesList } from './pages/employes/list/list.component';
import { AddComponent as EmployeeAdd } from './pages/employes/add/add.component';
import { DetailComponent as EmployeeDetails } from './pages/employes/detail/detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'employes/list', component: EmployesList },
    { path: 'employes/add', component: EmployeeAdd },
    { path: 'employes/:username', component: EmployeeDetails },
]; 
