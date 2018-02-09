import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  errorShow = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private messagesService: MessagesService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.authService.signup(form.value.name, form.value.email, form.value.password, form.value.passwordConfirmation)
        .subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/signin']);
                this.messagesService.add('Your Account has been successfully created. Login to your Account and enjoy.', 1);
            },
            error => {
              this.errorShow = true;
              this.errorMessage = error.error.message +
                                '<ul><li>' + error.error.errors.name + '</li>' +
                                '<li>' + error.error.errors.email + '</li>' +
                                '<li>' + error.error.errors.password + '</li></ul>'
              const regExp = new RegExp('<li>undefined</li>', 'g');
              this.errorMessage = this.errorMessage.replace(regExp, '');
            }
        );
  }
}
