import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) {

  }

  doOnGetAllRegion(){
    return this.http.get(`/region`);
  }
}
