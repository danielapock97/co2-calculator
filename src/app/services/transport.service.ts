import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transport} from "../entities/transport";

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://localhost:3000/transport'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'false'
    }),
  };
  constructor(private httpClient: HttpClient) { }

  get(): Observable<Transport[]> {
    return this.httpClient.get<Transport[]>(this.apiUrl)
  }

  getById(id: number): Observable<Transport> {
    return this.httpClient.get<Transport>(this.apiUrl + "/" + id)
  }
}
