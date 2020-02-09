import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8090/';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private http: HttpClient) {}

  public setDonate(id: number, sumDonate: number) {
    return this.http.post(API_URL + 'donate/' + id, sumDonate);
  }
}
