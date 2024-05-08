import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent {

  employee: Employee = new Employee();
  
  constructor(private employeeService:EmployeeService, private router:Router){

  }

  addEmployee(){
    this.employeeService.postEmployee(this.employee)
      .subscribe({
        next: (data) => {
          console.log(data);
       
        }, // response from restController which sends success httpCode e.g 200
        error: (error) => {
          console.log(error);
       
        } // handle restControlleAdvice which sends error httpCode e.g 404
      });
      this.employee = new Employee();
       
         this.router.navigate(['/employeelist']);
    }
  

}
