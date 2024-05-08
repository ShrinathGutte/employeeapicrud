import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[]=[];

  filterData = this.employees;

  employeeUpdate: Employee = new Employee();

  isUpdate: boolean = false;
  isUpdateSuccess: boolean = false;

  weatherData: { [key: string]: { temperature: number, humidity: number, windSpeed: number } } = {};


  constructor(private employeeService:EmployeeService, private router:Router, private weatherService: WeatherService){

  }
  
  ngOnInit()
   {
     this.loadAllEmployeesToComponent();
   }

   fetchWeatherForEmployees(city:string) {
      this.weatherService.getWeatherByCity(city).subscribe((data: any) => {
        this.weatherData[city] = {
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
      });
    
  }

   loadAllEmployeesToComponent(){
    this.employeeService.employeeList().
      subscribe(
        {
          next: (data:any) => {
            console.log(data);
            this.employees = data;
            this.filterData = data;
          },
          error: (error:any) => {
            console.log(error);
          },
          complete: () => { console.log("Loaded all data"); }
        }
      );
   }

   deleteEmployeeById(deleteID: number) {
    if (confirm("Do you want to delete Employee")) {
      console.log("delete method:" + deleteID);
      this.employeeService.deleteEmployeeById(deleteID)
        .subscribe(
          {
            next: (data:any) => {
              console.log(data);
              this.loadAllEmployeesToComponent();
            },
            error: (error:any) => {
              console.log(error);
            }
          }
        );
    }
  

}

goToAddEmployee()
  {
    alert("Navigate to Add Employee");
    this.router.navigate(['/newemployee']);
  }

  updateEmployee(employee: Employee){
    this.isUpdate = true;
    this.employeeUpdate = employee;
  }

  updateEmployeeSubmit() {
    console.log(this.employeeUpdate);
    this.employeeService.postEmployee(this.employeeUpdate)
    .subscribe({
      next: (data) => {
        console.log(data);
     
      }, // response from restController which sends success httpCode e.g 200
      error: (error) => {
        console.log(error);
     
      } // handle restControlleAdvice which sends error httpCode e.g 404
    });
   
     
       this.router.navigate(['/employeelist']);
   

   this.isUpdate = false;
    this.isUpdateSuccess = true;
  }

  onInputChange(event:Event)
  {
      const inputEvent = event.target as HTMLInputElement;
      const inputValue = inputEvent.value;
      console.log(inputValue);
      this.search(inputValue);
  }
  

  search(searchData:string)
  {  
   if(searchData)
   {
    this.filterData =  this.employees.filter((item)=>{
      return item.name.toLowerCase().includes(searchData.toLowerCase());
    
     })
   }
   else
   {
      this.filterData=this.employees;
   }
  }

  Logout(){
    alert("Do you want to Log Out");
    this.router.navigate(['/login']);
  }





}
