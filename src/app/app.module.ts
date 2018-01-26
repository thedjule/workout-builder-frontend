import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { MessagesComponent } from './messages/messages.component';
import {UserService} from './user.service';
import {WorkoutService} from './workout.service';
import {ExerciseService} from './exercise.service';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import {AuthService} from "./auth.service";


@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    WorkoutDetailComponent,
    WorkoutsComponent,
    ExerciseDetailComponent,
    ExercisesComponent,
    MessagesComponent,
    UserSigninComponent,
    UserSignupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [UserService, WorkoutService, ExerciseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
