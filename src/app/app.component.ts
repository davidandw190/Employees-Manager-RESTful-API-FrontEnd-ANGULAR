import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Spring-API-FRONTEND-Angular';

  public employees: Employee[] | undefined;
  public editEmployee: Employee | null | undefined;
  public deleteEmployee: Employee | null | undefined;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    addForm.reset();

  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null | undefined, mode: string ) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModel');

    } else if (mode === 'edit') {
      this.editEmployee = employee; // For binding the employee to be edited with the form
      button.setAttribute('data-target', '#editEmployeeModal');

    } else if (mode === 'delete') {
      this.deleteEmployee = employee; // For binding the employee to be deleted with the form
      button.setAttribute('data-target', '#deleteEmployeeModal');

    }
    // @ts-ignore
    container.appendChild(button);
    button.click();

  }


  onDeleteEmployee(employeeId: number | undefined) {
    if (employeeId) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }


  searchEmployees(value: any) {

  }

}
