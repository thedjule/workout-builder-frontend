import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { MessagesComponent } from './messages/messages.component';
import { UserService } from './user.service';
import { WorkoutService } from './workout.service';
import { ExerciseService } from './exercise.service';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import { AuthGuardService } from './auth-guard.service';
import { FilterPipe } from './filter.pipe';
import { ExerciseTypePipe } from './exercise-type.pipe';
import {MessagesService} from './messages.service';


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
    UserSignupComponent,
    HeaderComponent,
    DropdownDirective,
    FilterPipe,
    ExerciseTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, WorkoutService, ExerciseService, AuthService, AuthGuardService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
