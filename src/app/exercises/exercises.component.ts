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
  exercises: Exercise[];
  listLimit = 10;
  isLoading = false;

  constructor(private exercisesService: ExerciseService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.exercisesService.getAllExercises()
        .subscribe(
            response => {
                this.exercises = response['data'];
                this.isLoading = false;
            },
                    error => console.log(error)
        );
  }

  addToList() {
      this.listLimit += 10;
  }

}
