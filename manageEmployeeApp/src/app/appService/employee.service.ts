import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../appModel/emp.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  saveEmployeeData(employee: Employee) {
    return this.http.post<Employee>(
      'https://empapp-1e0f0-default-rtdb.firebaseio.com/employees.json',
      employee
    );
  }

  getEmployeeData() {
    return this.http
      .get('https://empapp-1e0f0-default-rtdb.firebaseio.com/employees.json')
      .pipe(
        map((resData: any) => {
          const empArr = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              empArr.push({ empId: key, ...resData[key] });
            }
          }
          return empArr;
        })
      );
  }

  getSingleEmployee(empId: any) {
    return this.http.get(
      'https://empapp-1e0f0-default-rtdb.firebaseio.com/employees/' +
        empId +
        '.json'
    );
  }

  removeEmployee(empId: any) {
    return this.http.delete(
      'https://empapp-1e0f0-default-rtdb.firebaseio.com/employees/' +
        empId +
        '.json'
    );
  }
}
