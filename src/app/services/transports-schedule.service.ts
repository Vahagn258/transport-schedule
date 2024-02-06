import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, filter, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Params } from '@angular/router';
import { IResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransportsScheduleService {

  private httpService = inject(HttpService);

  constructor() { }

  getTransportsSchedule(params: Params): Observable<IResponse> {
    return this.httpService.get(environment.searchApiUrl, Object.assign(params, {
      apikey: environment.apiToken
    }));
  }

  getStations(stationName: string): Observable<any> {
    return this.httpService.get(environment.stationsApiUrl, {format: 'old', part: stationName})
      .pipe(
        map((res: any) => res[1]),
        map((res: any) => res.map((val: any) => {
          return {
            code: val[0],
            name: val[2]
          }
        }))
      );
  }
}
