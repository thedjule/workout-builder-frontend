import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {
  errorShow = false;
  errorMessage = '';
  constructor(private authService: AuthService, private messagesService: MessagesService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password)
        .subscribe(
            response => {
                this.messagesService.clear();
            },
            error => {
              this.errorShow = true;
              this.errorMessage = error.error.message + '<br>' + error.error.errors.email + '<br>';
            }
        );
  }
}
