import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Student } from '../models/student';
import { log } from 'util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = `https://cch-vyp-p3.herokuapp.com/students`
  student: Subject<Student>
  id: number

  constructor(private _http: HttpClient) {
    this.student = new Subject()
  }

  getStudents(): Observable<Student> {
    return this._http.get<Student>(this.url)
  }

  postStudent(student: Student): Observable<Student> {
    return this._http.post<Student>(this.url, student, httpOptions)
    }

  updateStudent(student: Student): Observable<Student> {
    httpOptions.headers = 
      httpOptions.headers.set('Authorization', 'my-new-auth-token')
    const url = `${this.url}/${student.id}`
    return this._http.put<Student>(url, student, httpOptions)
  }

  deleteStudent(id: number): Observable<{}> {
    const url = `${this.url}/${id}`
    return this._http.delete(url, httpOptions)
  }
}
  

