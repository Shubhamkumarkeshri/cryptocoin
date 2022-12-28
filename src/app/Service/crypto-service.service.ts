import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoServiceService {

  constructor(private _http: HttpClient) { }

  getCoins(pageIndex:number, pagesize: number): Observable<any> {
    return this._http
      .get<any>(`https://api.coinstats.app/public/v1/coins?skip=${pageIndex}&limit=${pagesize}`, {})
      .pipe(
        map((response) => {
          if (response) {
            const Coins: any = response;
            return Coins;
          }
        })
      );
  }

  getmarkets(id: string): Observable<any> {
    return this._http
      .get<any>(`https://api.coinstats.app/public/v1/markets?coinId=${id}`, {})
      .pipe(
        map((response) => {
          if (response) {
            const markets: any = response;
            return markets;
          }
        })
      );
  }

  getExchange(): Observable<any> {
    return this._http
      .get<any>(`https://api.coinstats.app/public/v1/exchanges`, {})
      .pipe(
        map((response) => {
          if (response) {
            const exchange: any = response;
            return exchange;
          }
        })
      );
  }

  // https://api.coinstats.app/public/v1/tickers?exchange=yobit&pair=BTC-USD
  getTicker(exchange:any, pair:any): Observable<any> {
    return this._http
      .get<any>(`https://api.coinstats.app/public/v1/tickers?exchange=${exchange}&pair=${pair}`, {})
      .pipe(
        map((response) => {
          if (response) {
            const ticker: any = response;
            return ticker;
          }
        })
      );
  }
}
