import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Workout } from '../workout';
import { Exercise } from '../exercise';
import { ExerciseService } from '../exercise.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout = new Workout();
  userExercises: Exercise[] = [];
  exercises: Exercise[] = [];
  listLimit = 10;
  typeSelect = '';
  searchText = '';
  workoutReset = false;
  isLoading = false;

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.workoutService.getWorkout(id)
        .subscribe(
            workout => {
              this.workout = workout['data'];
              this.userExercises = workout['data']['exercises'];
            },
            error => console.log(error)
        );
    this.exerciseService.getAllExercises()
        .subscribe(
            exercises => {
                this.isLoading = false;
                this.exercises = exercises['data'];
            },
            error => console.log(error)
        );
    this.messagesService.clear();
  }

  onSaveWorkout() {
    this.isLoading = true;
    // Create an array of exercises
    const exercisesArray = [];
    for (const exercise of this.userExercises) {
      exercisesArray.push({ exercise_id: exercise.id });
    }
    // Create an Object of the Updated Workout with Exercises
    const updatedWorkout = {
      id: this.workout.id,
      name: this.workout.name,
      notes: this.workout.notes,
      exercises: exercisesArray
    };
    // Send the updated Workout to the WorkoutService
    this.workoutService.updateWorkout(updatedWorkout)
        .subscribe(
            workout => {
                this.messagesService.add('Workout Saved.', 1);
                this.isLoading = false;
            },
            error => console.log(error)
        );
  }

  onResetWorkout(id: number) {
    this.isLoading = true;
    this.workoutService.getWorkout(id)
        .subscribe(
            workout => {
              this.workout = workout['data'];
              this.userExercises = workout['data']['exercises'];
              this.workoutReset = false;
              this.isLoading = false;
            },
            error => console.log(error)
        );
  }

  onRemoveWorkout(index: number): void {
    this.userExercises.splice(index, 1);
    this.workoutReset = true;
  }

  onAddExercise(exercise: Exercise): void {
    this.userExercises.push(exercise);
    this.workoutReset = true;
  }

  goBack() {
      this.location.back();
  }

  addToList() {
      this.listLimit += 10;
  }

  onMove(exercise: Exercise, position: number) {
      this.userExercises.splice(position, 1, exercise);
      this.workoutReset = true;
  }
}
