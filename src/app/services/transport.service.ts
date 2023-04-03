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
    }),
  };
  constructor(private httpClient: HttpClient) { }

  getTransports(): Observable<Transport[]> {
    return this.httpClient.get<Transport[]>(this.apiUrl)
  }

  getTransportById(id: number): Observable<Transport> {
    return this.httpClient.get<Transport>(this.apiUrl + "/" + id)
  }

  postTransport(Transport: Transport): Observable<Transport> {
    const url = `${this.apiUrl}/${Transport.id}`;
    return this.httpClient.put<Transport>(url, Transport, this.httpOptions);
  }
}
