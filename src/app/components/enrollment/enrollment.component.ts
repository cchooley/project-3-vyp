import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Student } from '../../models/student';
import { DataSource } from '../../models/data';
import { Subject } from 'rxjs';
import { Scholarship } from '../../models/scholarship';
declare var fusioncharts: any;

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
  dataSource: DataSource
  title: string

  constructor(
    private _httpService: HttpService,
  ) {
    this.dataSource = {
      "chart": {
        "caption": "Student Enrollment",
        "subCaption": "Paid vs. Scholarship"
      },
      "data": [{
        "label": "Paid",
        "value": "880000"
      }, {
        "label": "Scholarship",
        "value": "730000"
      }]
    }
  }

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.studentArr = Object.values(students)[0]
      this.dataSource.data[0].value = this.studentArr.length
    })
    this._httpService.getScholarships().subscribe(scholarships => {
      this.scholArr = Object.values(scholarships)[0]
      this.dataSource.data[1].value = this.scholArr.length
    })
  }

  editStudentInfo(student) {
    this.editStudent = student
  }

  editScholInfo(scholarship) {
    this.editScholarship = scholarship
  }

  updateStudent() {
    if (this.editStudent) {
      this._httpService.updateStudent(this.editStudent)
        .subscribe(student => {
          const ix = student ? this.studentArr.findIndex(s => s.id === student.id) : -1;
          if (ix > -1) { this.studentArr[ix] = student; }
        });
      this.editStudent = undefined;
    }
  }

  updateScholarship() {
    if (this.editScholarship) {
      this._httpService.updateScholarship(this.editScholarship)
        .subscribe(scholarship => {
          const ix = scholarship ? this.studentArr.findIndex(s => s.id === scholarship.id) : -1;
          if (ix > -1) { this.scholArr[ix] = scholarship; }
        });
      this.editScholarship = undefined;
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