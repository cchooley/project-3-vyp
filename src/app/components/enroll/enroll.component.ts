import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { HttpService } from '../../services/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  ngOnInit(): void {
    this._httpService.getStudents().subscribe(students => {
      this.studentArr = Object.values(students)[0]
    })
  }

  studentArr: Array<Student>

  model: Student = {
    id: 0,
    name: '',
    age: null,
    contactEmail: '',
    emergencyContact: '',
    contactRelation: '',
    contactPhone: '',
    enrolledOn: new Date,
    paymentStatus: false
  }


  constructor(private _httpService: HttpService) { }

  trimDate(student) {
      return student.enrolledOn.slice(0, 10)
  }

  onClick(model): void {
    event.preventDefault()
    console.log(this.model)
    model.id = this.studentArr.length + 1
    if (this.model.age >= 6 
      && this.model.age <= 13 
      && this.model.name !== ''
      && this.model.contactEmail !== ''
      && this.model.emergencyContact !== ''
      && this.model.contactRelation !== ''
      && this.model.contactPhone.length === 10) {
      this._httpService.postStudent(this.model)
        .subscribe(student => this.studentArr.push(student))
      this.model = {
        id: 0,
        name: '',
        age: null,
        contactEmail: '',
        emergencyContact: '',
        contactRelation: '',
        contactPhone: '',
        enrolledOn: null,
        paymentStatus: false
      }
    } else {
      alert("Please fill in all required fields as instructed")
    }
  }

}


