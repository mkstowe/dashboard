import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  // public readonly plants: Observable<object>;
  // private _plants: BehaviorSubject<object>;

  constructor(private http: HttpClient) {
    // this.plants = this._plants.asObservable();
  }

  public getAllPlants() {
    return this.http.get('/api/plants');
  }

  public getPlant(id: number) {
    return this.http.get(`/api/plants/${id}`)
  }

  public createPlant(plant: Plant) {
    return this.http.post('/api/plants', plant);
  }

  public updatePlant(id: number, plant: Plant) {
    return this.http.patch(`/api/plants/${id}`, plant);
  }

  public deletePlant(id: number) {
    return this.http.delete(`/api/plant/${id}`);
  }
}
