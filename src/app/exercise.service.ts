import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExerciseService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken()
    })
  };

  constructor(private authService: AuthService, private http: HttpClient) { }

  getExercises(page: number) {
    return this.http.get(this.authService.apiUrl + 'exercises/?page=' + page, this.httpOptions);
  }

  getAllExercises() {
    return this.http.get(this.authService.apiUrl + 'exercises/all', this.httpOptions);
  }
}
