import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExerciseService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getAllExercises() {
    return this.http.get(this.authService.apiUrl + 'exercises',
        {headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        })});
  }
}
