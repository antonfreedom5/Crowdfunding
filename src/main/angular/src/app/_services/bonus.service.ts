import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bonus} from '../Model/Bonus';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8090/';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  constructor(private http: HttpClient) {
  }

  public getBonusesByCompany(id: number): Observable<Bonus[]> {
    return this.http.get<Bonus[]>(API_URL + 'bonuses/' + id);
  }

  public addBonus(id: number, bonus: Bonus) {
    return this.http.post<Bonus>(API_URL + 'addbonus/' + id, bonus);
  }

  public buyBonus(bonusId: number) {
    return this.http.post<number>(API_URL + 'buy', bonusId);
  }

  public deleteBonusById(bonusId: any) {
    return this.http.delete(API_URL + 'bonus-delete/' + bonusId);
  }
}
