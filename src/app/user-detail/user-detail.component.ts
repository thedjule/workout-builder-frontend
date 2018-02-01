import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User = new User();
  gender = ['Male', 'Female'];

  constructor(private userService: UserService, private authService: AuthService) { }

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
