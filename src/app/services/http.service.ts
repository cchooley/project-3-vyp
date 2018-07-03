import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs'
import { Student } from '../models/student'
import { Scholarship } from '../models/scholarship'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = `https://vypheroku.herokuapp.com`
  student: Subject<Student>
  id: number

  constructor(private _http: HttpClient) {
    this.student = new Subject()
  }

  getStudents(): Observable<Student> {
    return this._http.get<Student>(`${this.url}/students`)
  }

  getScholarships(): Observable<Scholarship> {
    return this._http.get<Scholarship>(`${this.url}/scholarships`)
  }

  postStudent(student: Student): Observable<Student> {
    return this._http.post<Student>(`${this.url}/students`, student, httpOptions)
    }

  postScholarship(scholarship: Scholarship): Observable<Scholarship> {
    return this._http.post<Scholarship>(`${this.url}/scholarships`, scholarship, httpOptions)
  }

  updateStudent(student: Student): Observable<Student> {
    httpOptions.headers = 
      httpOptions.headers.set('Authorization', 'my-new-auth-token')
    const url = `${this.url}/students/${student.id}`
    return this._http.put<Student>(url, student, httpOptions)
  }

  updateScholarship(scholarship: Scholarship): Observable<Scholarship> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token')
    const url = `${this.url}/scholarships/${scholarship.id}`
    return this._http.put<Scholarship>(url, scholarship, httpOptions)
  }

  deleteStudent(id: number): Observable<{}> {
    const url = `${this.url}/students/${id}`
    return this._http.delete(url, httpOptions)
  }

  deleteScholarship(id: number): Observable<{}> {
    const url = `${this.url}/scholarships/${id}`
    return this._http.delete(url, httpOptions)
  }

}
  

