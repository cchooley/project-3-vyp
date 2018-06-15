import { Component, OnInit } from '@angular/core';
import { Scholarship } from '../../models/scholarship';
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
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css']
})
export class ScholarshipComponent implements OnInit {

  ngOnInit(): void {
    this._httpService.getScholarships().subscribe(scholarships => {
      this.scholArr = Object.values(scholarships)[0]
    })
  }

  scholArr: Array<Scholarship>

  model: Scholarship = {
    id: 0,
    name: '',
    age: null,
    contactEmail: '',
    emergencyContact: '',
    contactRelation: '',
    contactPhone: '',
    enrolledOn: new Date,
    verifiedBy: "Please Verify"
  }


  constructor(private _httpService: HttpService) { }

  trimDate(student) {
    return student.enrolledOn.slice(0, 10)
  }

  onClick(model): void {
    event.preventDefault()
    model.id = this.scholArr.length + 1
    if (this.model.age >= 6
      && this.model.age <= 13
      && this.model.name !== ''
      && this.model.contactEmail !== ''
      && this.model.emergencyContact !== ''
      && this.model.contactRelation !== ''
      && this.model.contactPhone.length === 10) {
      this._httpService.postScholarship(this.model)
        .subscribe(scholarship => this.scholArr.push(scholarship))
      this.model = {
        id: 0,
        name: '',
        age: null,
        contactEmail: '',
        emergencyContact: '',
        contactRelation: '',
        contactPhone: '',
        enrolledOn: null,
        verifiedBy: "Please Verify"
      }
    } else {
      alert("Please fill in all required fields as instructed")
    }
  }

}


