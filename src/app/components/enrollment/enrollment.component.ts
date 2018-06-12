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
  students: Object
  student: Subject<Student>
  studentArr: Array<Student>
  scholarships: Boolean

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.students = students
      this.studentArr = Object.values(students)[0]
    })
  }

  trimDate(students) {
    return students.map((student, index) => {
      return student.enrolledOn.slice(0, 10)
    })
  }

  delete(student){
    this._httpService.deleteStudent(student)
  }
}