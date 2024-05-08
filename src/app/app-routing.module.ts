import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path:'employeelist', component:EmployeeListComponent },
  { path:'newemployee', component:AddNewEmployeeComponent },
  { path:'register', component:RegistrationComponent},
  { path:'login', component:LoginComponent},
  { path:'forgotpassword', component:ForgotPasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
