import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transport} from "../entities/transport";
import {TransportUser} from "../entities/transport-user";

@Injectable({
  providedIn: 'root'
})
export class TransportUserService {
  private apiUrl = 'http://localhost:3000/user_transport'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  post(userTransport: TransportUser): Observable<TransportUser> {
    return this.httpClient.post<TransportUser>(this.apiUrl, userTransport, this.httpOptions)
  }
}
