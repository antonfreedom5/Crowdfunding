import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/User";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8090/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(id: number): Observable<User> {
    return this.http.get(API_URL + 'getUserInfo/' + id);
  }

  public saveUserAvatar(user: User): Observable<User> {
    return this.http.patch<User>(API_URL + 'saveAvatar', user);
  }
}
