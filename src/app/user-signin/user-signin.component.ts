import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password)
        .subscribe(
            response => console.log(response),
            error => {
              console.log(error);
              if (error['status'] === 401) {
                this.authService.deleteToken();
              }
            }
        );
  }
}
