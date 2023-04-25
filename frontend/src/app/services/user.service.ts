import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8080/users'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl)
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "/" + id)
  }

  put(user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiUrl + "/" + user.id, user, this.httpOptions)
  }
}
