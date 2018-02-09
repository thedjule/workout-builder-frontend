import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';
import { Exercise } from '../exercise';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  modalNewWorkout = false;
  modalUpdateWorkout = false;
  modalViewWorkout = false;
  workouts: Workout[] = [];
  exercises: Exercise[] = [];
  workoutIndex = -1;
  createWorkoutForm: FormGroup;
  updateWorkoutForm: FormGroup;

  constructor(
      private workoutService: WorkoutService,
      private userService: UserService,
      private fb: FormBuilder,
      private messagesService: MessagesService
  ) {

      this.createWorkoutNewForm();
  }

  ngOnInit() {
    this.userService.getUser()
        .subscribe(
          response => this.workouts = response['data']['workouts']
        );
    this.messagesService.clear();
  }

  createWorkoutNewForm() {
      this.createWorkoutForm = this.fb.group({
          name: ['', {validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'}],
          notes: ''
      });
  }

  createWorkoutUpdateForm(index: number) {
      this.updateWorkoutForm = this.fb.group({
          name: [this.workouts[index].name, {
              validators: [Validators.required, Validators.minLength(5)],
              updateOn: 'blur'
          }],
          notes: this.workouts[index].notes
      });
  }

  get nameNew() {
      return this.createWorkoutForm.get('name');
  }

  get nameUpdate() {
    return this.updateWorkoutForm.get('name');
  }

  // Get Exercises from a Workout from Workouts array
  onGetWorkoutExercises(index: number) {
      this.exercises = this.workouts[index]['exercises'];
      this.modalViewWorkout = !this.modalViewWorkout;
  }

  // Create a Workout, Reset the Form and Hide the Create Workout Modal
  onCreateWorkout() {
    this.workoutService.createWorkout(this.createWorkoutForm.value.name, this.createWorkoutForm.value.notes)
        .subscribe(
            workout => {
              console.log(workout);
              this.workouts.push(workout['data']);
              this.modalNewWorkout = !this.modalNewWorkout;
              this.createWorkoutForm.reset();
              this.messagesService.add('Workout ' + workout['data'].name + ' successfully created.', 1);
            },
            error => console.log(error)
        );
  }

  // Show the Workout Update Modal, Create the Update Form and store the index of the Workout
  // in workouts array so it can be used by UpdateWorkout function to update the array with new data
  onShowUpdateModal(index: number) {
      this.modalUpdateWorkout = !this.modalUpdateWorkout;
      this.createWorkoutUpdateForm(index);
      this.workoutIndex = index;
  }

  // Update a Workout and update the Workouts array
  onUpdateWorkout() {
      // Create an array of exercises
      const exercisesArray = [];
      for (const exercise of this.workouts[this.workoutIndex]['exercises']) {
          exercisesArray.push({ exercise_id: exercise.id });
      }
      // Create an Object of the Updated Workout with Exercises
      const updatedWorkout = {
          id: this.workouts[this.workoutIndex].id,
          name: this.updateWorkoutForm.value.name,
          notes: this.updateWorkoutForm.value.notes,
          exercises: exercisesArray
      };
      // Update the Workout in Workouts Array with new values
      this.workouts[this.workoutIndex].name = this.updateWorkoutForm.value.name;
      this.workouts[this.workoutIndex].notes = this.updateWorkoutForm.value.notes;

      // Send the updated Workout to the WorkoutService
      this.workoutService.updateWorkout(updatedWorkout)
          .subscribe(
              workout => this.messagesService.add('Workout ' + workout['data'].name + ' has been successfully updated.', 1),
              error => console.log(error)
          );

      // Hide the Update Workout Modal and reset the form
      this.modalUpdateWorkout = !this.modalUpdateWorkout;
      this.updateWorkoutForm.reset();
  }

  // Delete the Workout and remove it from Workouts Array
  onDeleteWorkout(id: number, i: number) {
    this.workoutService.deleteWorkout(id)
        .subscribe(
          response => this.messagesService.add('Workout ' + response['data'].name + ' has been deleted.', 0),
          error => console.log(error)
        );
    this.workouts.splice(i, 1);
  }
}
