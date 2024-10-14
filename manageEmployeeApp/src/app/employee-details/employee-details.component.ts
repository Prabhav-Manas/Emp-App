import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../appService/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  singleEmpData: any[] = [];
  data: any = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private _empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const empId = params.get('empId');
      if (empId) {
        this._empService.getSingleEmployee(empId).subscribe((res) => {
          this.singleEmpData.push(res);
          console.log(this.singleEmpData);
        });
      } else {
        console.log('Employee ID is missing');
      }
    });
  }

  onGoBack() {
    this.router.navigate(['/employees-dashboard']);
  }
}
