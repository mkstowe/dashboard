import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private refetchSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  get refetch() {
    return this.refetchSubject.asObservable();
  }

  public getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>('/api/plants');
  }

  public getPlant(id: number) {
    return this.http.get<Plant>(`/api/plants/${id}`)
  }

  public createPlant(plant: Plant) {
    return this.http.post<Plant>('/api/plants', plant).pipe(tap(() => this.refetchSubject.next(null)));
  }

  public updatePlant(id: number, plant: Plant) {
    return this.http.patch(`/api/plants/${id}`, plant).pipe(tap(() => this.refetchSubject.next(null)));
  }

  public deletePlant(id: number) {
    return this.http.delete(`/api/plant/${id}`).pipe(tap(() => this.refetchSubject.next(null)));
  }
}
