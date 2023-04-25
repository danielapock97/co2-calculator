import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserTransport} from "../entities/user-transport";

@Injectable({
  providedIn: 'root'
})
export class UserTransportService {
  private apiUrl = 'http://127.0.0.1:8080/user_transports'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'false'
    }),
  };
  constructor(private httpClient: HttpClient) { }

  post(userTransport: UserTransport): Observable<UserTransport> {
    return this.httpClient.post<UserTransport>(this.apiUrl, userTransport, this.httpOptions)
  }

  getTransportsByUser(userID: string): Observable<UserTransport[]> {
    let httpsParams = new HttpParams()
      .set('userId', userID)
      .set('orderBy', 'date')

    return this.httpClient.get<UserTransport[]>(this.apiUrl, {params: httpsParams})
  }

  get(): Observable<UserTransport[]> {
    return this.httpClient.get<UserTransport[]>(this.apiUrl)
  }
}
