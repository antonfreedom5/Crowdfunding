import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../Model/Company';

const API_URL = 'http://localhost:8090/';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public getTop3Companies(): Observable<Company[]> {
    return this.http.get<Company[]>(API_URL);
  }

  public getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(API_URL + 'company/' + id);
  }

  public getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(API_URL + 'allcompanies');
  }

  public addCompany(company: Company) {
    return this.http.post<Company>(API_URL + 'addcompany', company);
  }

  public editCompany(company: Company, id: number) {
    return this.http.post<Company>(API_URL + 'company-edit/' + id, company);
  }
}
