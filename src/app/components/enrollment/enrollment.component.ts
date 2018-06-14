import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Student } from '../../models/student';
import { Observable, Subject } from 'rxjs';
import { Scholarship } from '../../models/scholarship';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  student: Subject<Student>
  studentArr: Array<Student>
  scholArr: Array<Scholarship>
  scholarships: Boolean
  editStudent: Student
  editScholarship: Scholarship

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.studentArr = Object.values(students)[0]
    })
    this._httpService.getScholarships().subscribe(scholarships => {
      this.scholArr = Object.values(scholarships)[0]
    })
  }

  editStudentInfo(student) {
    this.editStudent = student
  }

  editScholInfo(scholarship) {
    this.editScholarship = scholarship
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

  deleteStudent(student: Student): void {
    this.studentArr = this.studentArr.filter(s => s !== student)
    this._httpService.deleteStudent(student.id).subscribe()
  }

  deleteScholarship(scholarship: Scholarship): void {
    this.scholArr = this.scholArr.filter(s => s !== scholarship)
    this._httpService.deleteScholarship(scholarship.id).subscribe()
  }

}