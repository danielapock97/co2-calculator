import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Emissions} from "../entities/emissions";
import {Estimate} from "../entities/estimate";
import {Transport} from "../entities/transport";
import {UserTransport} from "../entities/user-transport";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  private URL = 'https://beta3.api.climatiq.io/estimate?';
  private API_KEY = 'Bearer TFR7JN8RFA4FTMNV8Q9HACJ3T6N3'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.API_KEY,
      'Access-Control-Allow-Origin': 'false'
    }),
  };
  constructor(private httpClient: HttpClient) { }

  post(transport: Transport, distance: number): Observable<Emissions> {

    let body = {
      "emission_factor": {
        "activity_id": transport.activity_id,
        "source": transport.source,
        "region": transport.region,
        "year": transport.year,
        "lca_activity": transport.lca_activity
      },
      "parameters": {
        "distance_unit": "km"
      }
    } as Estimate

    body.emission_factor.activity_id = transport.activity_id;
    body.emission_factor.source = transport.source;
    body.emission_factor.region = transport.region;
    body.emission_factor.year = transport.year;
    body.emission_factor.lca_activity = transport.lca_activity
    body.parameters.distance_unit = "km"
    body.parameters.distance = Number(distance);

    return this.httpClient.post<Emissions>(this.URL, body, this.httpOptions)
  }

  get(activity_id: string): Observable<any> {
    let httpsParams = new HttpParams()
      .set('activity_id', activity_id)

    return this.httpClient.get<UserTransport[]>(this.URL + "/search", {params: httpsParams})  }
}
