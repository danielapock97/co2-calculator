import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransportUser} from "../entities/transport-user";

@Injectable({
  providedIn: 'root'
})
export class TransportUserService {
  private apiUrl = 'http://localhost:3000/user_transport'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'false'
    }),
  };
  constructor(private httpClient: HttpClient) { }

  post(userTransport: TransportUser): Observable<TransportUser> {
    return this.httpClient.post<TransportUser>(this.apiUrl, userTransport, this.httpOptions)
  }

  getEmissionsByUserAndMonth(userID: number) {

  }

  getTransportsByUser(userID: number): Observable<TransportUser[]> {
    let httpsParams = new HttpParams()
      .set('userID', userID)
      .set('orderBy', 'date')

    return this.httpClient.get<TransportUser[]>(this.apiUrl, {params: httpsParams})
  }
}
