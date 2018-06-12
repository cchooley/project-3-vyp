import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  model: Student = {
    name: '',
    age: null,
    enrolledOn: new Date(),
    scholarship: true
  }
  students: Object
  studentArr: Array<Student>

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.students = students
      this.studentArr = Object.values(students)[0]
    })
  }

  onClick(model): void {
    event.preventDefault()
    if (this.model.age >= 6 && this.model.age <= 13) {
    this._httpService.postStudent(this.model)
      .subscribe(student => this.studentArr.push(student))
    console.log(this.studentArr)
    this.model = {
      name: '',
      age: null,
      enrolledOn: null,
      scholarship: false
      }
    } else {
      alert("Student must be between age of 6 and 13")
    }
  }
}
