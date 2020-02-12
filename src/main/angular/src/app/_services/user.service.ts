import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../Model/User';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8090/users/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  public revertActivation(id): Observable<User> {
    return this.http.patch(API_URL + 'revertActivationStatus', {id: id})
  }

  public makeAdmin(id): Observable<User> {
    return this.http.patch(API_URL + 'makeAdmin', {id: id})
  }
}
