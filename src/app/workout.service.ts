import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Workout } from './workout';

@Injectable()
export class WorkoutService {

  private httpHeader = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

  constructor(private authService: AuthService, private http: HttpClient) {}

  getWorkout(id: number) {
      return this.http.get(this.authService.apiUrl + 'workouts/' + id,
          {headers: this.httpHeader.append('Authorization', 'Bearer ' + this.authService.getToken())});
  }
  createWorkout(name: string, notes: string) {
      return this.http.post(this.authService.apiUrl + 'workouts/store', {name: name, notes: notes},
          {headers: this.httpHeader.append('Authorization', 'Bearer ' + this.authService.getToken())});
  }
  updateWorkout(workout: Workout) {
      return this.http.put(this.authService.apiUrl + 'workouts/store', workout,
          {headers: this.httpHeader.append('Authorization', 'Bearer ' + this.authService.getToken())});
  }
  deleteWorkout(id: number) {
      return this.http.delete(this.authService.apiUrl + 'workouts/' + id,
          {headers: this.httpHeader.append('Authorization', 'Bearer ' + this.authService.getToken())});
  }
}
