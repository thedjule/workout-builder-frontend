import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class AuthService {

  public apiUrl = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string, passwordConfirmation: string) {
    return this.http.post(
        this.apiUrl + 'register',
        { name: name, email: email, password: password, password_confirmation: passwordConfirmation },
        httpOptions);
  }

  signin(email: string, password: string) {
    return this.http.post(
        this.apiUrl + 'login',
        { email: email, password: password },
        httpOptions)
        .map(
          (response: Response) => {
            const token = response['data'].api_token;
            localStorage.setItem('token', token);
            return token;
          }
        );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
