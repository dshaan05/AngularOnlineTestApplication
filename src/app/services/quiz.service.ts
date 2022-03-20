import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  readonly rootUrl = 'http://localhost:3000/data';
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.rootUrl ); 
  }
   
}
