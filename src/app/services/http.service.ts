import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Student } from '../models/student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = `https://cch-vyp-p3.herokuapp.com/students`
  student: Subject<Student>
  model: object
  options = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _http: HttpClient) {
    this.student = new Subject()
  }

  getStudents(): Observable<Student> {
    return this._http.get<Student>(this.url)
  }

  postStudent(student: Student): Observable<Student> {
    return this._http.post<Student>(this.url, student, httpOptions)
    }

  editStudent(student: Student): Observable<Student> {
    return this._http.put<Student>(this.url, student, httpOptions)
  }

  deleteStudent(student: Student): Observable<{}> {
    return this._http.delete(this.url, httpOptions)
  }
}
  

