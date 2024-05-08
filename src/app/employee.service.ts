import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl="http://localhost:8082/api/v1/employee";

  constructor(private http:HttpClient) { 

  }

  employeeList() : Observable<any>
  {
    return this.http.get(this.baseUrl);
  }

  postEmployee(newEmployee: Employee): Observable<any> {
    return this.http.post(this.baseUrl, newEmployee);
  }


  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

  deleteEmployeeById(id: number): Observable<any> {
    console.log("Inside employee service deleteby id:" + id);
     return this.http.delete(this.baseUrl +"/"+ id, { responseType: "text" });
  }

}
