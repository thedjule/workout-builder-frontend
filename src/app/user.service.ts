import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getUser() {
    return this.http.get(this.authService.apiUrl + 'user',
        {headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        })});
  }

  updateUser(id: number, name: string, age: string, gender: string, height: number, weight: number) {
    return this.http.put(this.authService.apiUrl + 'user/update',
        { id: id, name: name, age: age, gender: gender, height: height, weight: weight },
        {headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        })});
  }
}
