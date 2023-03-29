import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HassService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.authToken.access_token}`,
  });

  constructor(private http: HttpClient) {}
  public getStates() {
    return this.http.get('/api/states', { headers: this.headers });
  }

  public getState(entityId: string) {
    return this.http.get(`/api/state/${entityId}`, { headers: this.headers });
  }

  public getServices() {
    return this.http.get('/api/services', { headers: this.headers });
  }

  public getEvents() {
    return this.http.get('/api/events', { headers: this.headers });
  }

  public updateState(entityId: string, data: any) {
    return this.http.post(`/api/states/${entityId}`, data, {
      headers: this.headers,
    });
  }

  public fireEvent(eventType: string, data: any) {
    return this.http.post(`/api/events/${eventType}`, data, {
      headers: this.headers,
    });
  }

  public callService(domain: string, service: string, data: any) {
    return this.http.post(`/api/services/${domain}/${service}`, data, {
      headers: this.headers,
    });
  }
}
