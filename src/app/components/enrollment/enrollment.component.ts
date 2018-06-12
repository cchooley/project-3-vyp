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

  trimDate(students) {
    return students.map((student, index) => {
      return student.enrolledOn.slice(0, 10)
    })
  }

  delete(student: Student): void {
    console.log(typeof student.id)
    this.studentArr = this.studentArr.filter(s => s !== student);
    this._httpService.deleteStudent(student.id).subscribe();
  }

}