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
      'http://localhost:9000/api/employees/add-employee',
      employee
    );
  }

  // getEmployeeData() {
  //   return this.http.get('http://localhost:9000/api/employees/employees').pipe(
  //     map((resData: any) => {
  //       const empArr = [];
  //       for (const key in resData) {
  //         if (resData.hasOwnProperty(key)) {
  //           empArr.push({ empId: key, ...resData[key] });
  //         }
  //       }
  //       return empArr;
  //     })
  //   );
  // }

  getEmployeeData() {
    return this.http
      .get('http://localhost:9000/api/employees/all-employees')
      .pipe(
        map((resData: any) => {
          // Accessing the employees array explicitly
          const empArr = resData.employees || [];
          const formattedEmpArr = empArr.map((employee: any) => {
            return { empId: employee._id, ...employee };
          });
          return formattedEmpArr;
        })
      );
  }

  getSingleEmployee(empId: any) {
    return this.http
      .get(`http://localhost:9000/api/employees/employee/${empId}`)
      .pipe(
        map((resData: any) => {
          return resData.employee; // Adjust based on your response structure
        })
      );
  }

  removeEmployee(empId: any) {
    return this.http.delete(
      `http://localhost:9000/api/employees/employee/${empId}`
    );
  }
}
