import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
        .subscribe(
            user => this.user = user['data'],
            error => console.log(error)
        );
  }

  onUpdateUser(form: NgForm) {
    console.log(this.user);
    return this.userService.updateUser(this.user.id, form.value.name, form.value.age, form.value.gender, form.value.height, form.value.weight)
        .subscribe(
            response => console.log(response),
            error => console.log(error)
        );
  }
}
