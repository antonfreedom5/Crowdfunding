import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8090/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'userlist');
  }

  public deleteUser(id) {
    return this.http.delete<User[]>(API_URL + 'cancel/' + id);
  }

  public saveUser(user: User) {
    console.log("saving user :: " + user);
    return this.http.put<User>(API_URL + 'save', user);
  }
}
