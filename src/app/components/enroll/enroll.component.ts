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
    id: 0,
    name: '',
    age: null,
    enrolledOn: new Date(),
    scholarship: true
  }
  studentArr: Array<Student>

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.studentArr = Object.values(students)[0]
    })
  }

  trimDate(student) {
      return student.enrolledOn.slice(0, 10)
  }

  onClick(model): void {
    event.preventDefault()
    if (this.model.age >= 6 && this.model.age <= 13 && this.model.name !== '') {
      this._httpService.postStudent(this.model)
        .subscribe(student => this.studentArr.push(student))
      this.model = {
        id: 0,
        name: '',
        age: null,
        enrolledOn: null,
        scholarship: false
      }
    } else {
      alert("Please fill in the required fields with a valid name and age.")
    }
  }
}
