import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User = new User();
  errorShow = false;
  errorMessage = '';

  constructor(private userService: UserService,
              private authService: AuthService,
              private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.userService.getUser()
        .subscribe(
            user => this.user = user['data'],
            error => console.log(error)
        );
  }

  onUpdateUser(form: NgForm) {
    return this.userService.updateUser(
        this.user.id,
        form.value.name,
        form.value.age,
        form.value.gender,
        form.value.height,
        form.value.weight
    ).subscribe(
        response => this.messagesService.add('User successfully updated', 1),
        error => {
          this.errorShow = true;
          this.errorMessage = error.error.message + '<br>' + error.error.errors.name + '<br>';
          if (error['status'] === 401) {
            this.authService.deleteToken();
          }
        }
    );
  }
}
