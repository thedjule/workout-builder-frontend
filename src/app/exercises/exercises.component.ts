import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import {Exercise} from '../exercise';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  page = 0;
  lastPage = 1;
  exercises: Exercise[];

  constructor(private exercisesService: ExerciseService, private authService: AuthService) { }

  ngOnInit() {
    this.exercisesService.getExercises(this.page)
        .subscribe(
            response => {
              this.exercises = response['data'];
              this.page = response['meta'].current_page;
              this.lastPage = response['meta'].last_page;
            },
            error => {
                console.log(error);
                if (error['status'] === 401) {
                    this.authService.deleteToken();
                }
            }
        );
  }

  onGetExercises(page: number) {
    this.page = page;
    this.exercisesService.getExercises(this.page)
        .subscribe(
            response => {
              this.exercises = response['data'];
              this.page = response['meta'].current_page;
              this.lastPage = response['meta'].last_page;
            },
            error => {
                console.log(error);
                if (error['status'] === 401) {
                    this.authService.deleteToken();
                }
            }
        );
  }
}
