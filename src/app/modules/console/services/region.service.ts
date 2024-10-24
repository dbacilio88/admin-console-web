import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Observable} from 'rxjs';
import {Region} from '../models/region.model';
import {ResponseModel} from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private currentListRegionSubject = new BehaviorSubject<Region[]>([]);
  public currentListRegion = this.currentListRegionSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {

  }

  doOnGetAllRegion(): Observable<Region[]> {
    return this.http.get<Region[]>(`/region`);
  }

  doOnSaveRegion(region: Partial<Region>): Observable<Region> {
    console.log("Partial region ", region);
    return this.http.post<Region>(`/region`, region);
  }

  doOnUpdateRegion(region: Partial<Region>): Observable<Region> {
    return this.http.put<Region>(`/region/${region.id}`, region);
  }

  doOnDeleteRegion(id: string): Observable<Region> {
    return this.http.delete<Region>(`/region/${id}`);
  }

  updateRegions(regions: Region[]) {
    this.currentListRegionSubject.next(regions);
  }

  getRegions(): Region[] {
    return this.currentListRegionSubject.getValue();
  }

  doOnGetPaginationRegion(page: number, size: number): Observable<ResponseModel> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());
    return this.http.get<ResponseModel>(`/region/page`, {params: params});
  }

}
