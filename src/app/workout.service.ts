import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Workout } from './workout';

@Injectable()
export class WorkoutService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken()
    })
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  getWorkout(id: number) {
      return this.http.get(this.authService.apiUrl + 'workouts/' + id, this.httpOptions);
  }
  createWorkout(name: string, notes: string) {
      return this.http.post(this.authService.apiUrl + 'workouts/store', {name: name, notes: notes}, this.httpOptions);
  }
  updateWorkout(workout: Workout) {
      return this.http.put(this.authService.apiUrl + 'workouts/store', workout, this.httpOptions);
  }
  deleteWorkout(id: number) {
      return this.http.delete(this.authService.apiUrl + 'workouts/' + id, this.httpOptions);
  }
}
