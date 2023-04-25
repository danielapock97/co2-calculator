import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transport} from "../entities/transport";

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://127.0.0.1:8080/transports'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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
