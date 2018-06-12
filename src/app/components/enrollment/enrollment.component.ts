import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Student } from '../../models/student';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  student: Subject<Student>
  studentArr: Array<Student>
  scholarships: Boolean
  editStudent: Student

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.studentArr = Object.values(students)[0]
      console.log(this.studentArr)
    })
  }

  edit(student) {
    this.editStudent = student
  }

  update() {
    if (this.editStudent) {
      this._httpService.updateStudent(this.editStudent)
        .subscribe(student => {
          const ix = student ? this.studentArr.findIndex(s => s.id === student.id) : -1;
          if (ix > -1) { this.studentArr[ix] = student; }
        });
      this.editStudent = undefined;
    }
  }

  delete(student: Student): void {
    this.studentArr = this.studentArr.filter(s => s !== student)
    this._httpService.deleteStudent(student.id).subscribe()
  }

}