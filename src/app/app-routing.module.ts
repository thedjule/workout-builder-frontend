import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  { path: '',  redirectTo: '/workouts', pathMatch: 'full' },
  { path: 'user', component: UserDetailComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: UserSigninComponent },
  { path: 'signup', component: UserSignupComponent },
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuardService] },
  { path: 'workout/:id', component: WorkoutDetailComponent, canActivate: [AuthGuardService] },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'exercise/:id', component: ExerciseDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
