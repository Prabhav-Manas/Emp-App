import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../appService/employee.service';
import { Employee } from '../appModel/emp.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees-dashboard',
  templateUrl: './employees-dashboard.component.html',
  styleUrls: ['./employees-dashboard.component.scss'],
})
export class EmployeesDashboardComponent implements OnInit {
  addEmpForm: any = FormGroup;
  employees: any[] = [];
  editMode: boolean = false;
  editEmployeeID: any;
  searchName: any = '';
  // Pagination
  page: number = 1;
  count: number = 0;
  employeeSize: number = 4;
  employeeSizes: any = [5, 10, 15, 20];
  // Pagination

  constructor(
    private fb: FormBuilder,
    private _empService: EmployeeService,
    private http: HttpClient
  ) {
    this.addEmpForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.fetchEmployee();
  }

  // Pagination
  onEmployeeBoardDataChange(event: any) {
    this.page = event;
    this.fetchEmployee();
  }

  onTableSizeChange(event: any) {
    this.employeeSize = event.target.value;
    this.page = 1;
    this.fetchEmployee();
  }
  // Pagination

  onAddEmployee(empData: Employee) {
    if (this.addEmpForm.valid) {
      console.log('Check Employee Save:=> ', this.addEmpForm.value);
      if (this.editMode) {
        this.http
          .patch(
            `http://localhost:9000/api/employees/employee/${this.editEmployeeID}`,
            empData
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.fetchEmployee();
              // alert('Employee Details Updated!!');
            },
            (errRes) => {
              console.log(errRes);
            }
          );
      } else {
        this._empService.saveEmployeeData(this.addEmpForm.value).subscribe(
          (res) => {
            console.log(res);
            this.fetchEmployee();
          },
          (errRes) => {
            console.log(errRes);
          }
        );
      }
    }
    this.addEmpForm.reset();
  }

  fetchEmployee() {
    this._empService.getEmployeeData().subscribe(
      (res) => {
        console.log(res);
        this.employees = res;
        console.log(this.employees);
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  }

  onEditEmployee(empId: any, index: any) {
    console.log('Check Edit Employee:=> ', this.employees[index]);

    this.editMode = true;

    this.editEmployeeID = empId;
    console.log(this.employees[index]);
    this.addEmpForm.setValue({
      name: this.employees[index].name,
      age: this.employees[index].age,
      gender: this.employees[index].gender,
      designation: this.employees[index].designation,
    });
  }

  onDiscardEdit() {
    this.addEmpForm.reset();
    this.editMode = false;
  }

  onDeleteEmployee(empId: any) {
    if (confirm('Do you want to delete this employee ?')) {
      console.log('For Delete Employee:=> ', empId);
      this._empService.removeEmployee(empId).subscribe(
        (res) => {
          console.log(res);
          this.fetchEmployee();
        },
        (errRes) => {
          console.log(errRes);
        }
      );
    }
  }
}
