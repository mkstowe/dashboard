import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
  HassEntities,
  Connection,
  MessageBase,
} from 'home-assistant-js-websocket';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceCall } from '../models/service-call';
import { StateOptions } from '../models/state-options';

@Injectable({
  providedIn: 'root',
})
export class HassService {
  public readonly entities: Observable<HassEntities>;

  private refetchSubject = new BehaviorSubject(null);
  private _editMode = new BehaviorSubject<boolean>(false);
  private _entities: BehaviorSubject<HassEntities> =
    new BehaviorSubject<HassEntities>({});
  private connection: Connection;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.hassAccessToken}`,
  });


  constructor(private http: HttpClient) {
    this.entities = this._entities.asObservable();
    this.connect();
  }

  public get refetch() {
    return this.refetchSubject.asObservable();
  }

  public get editMode$(): Observable<boolean> {
    return this._editMode.asObservable();
  }

  public set editMode$(val: boolean) {
    this._editMode.next(val);
  }

  public getAllGroups() {
    return this.http.get(`/api/hass/group`)
  }

  public createGroup(group: any) {
    return this.http.post(`/api/hass/group`, group)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public updateGroup(id: number, group: any) {
    return this.http.patch(`/api/hass/group/${id}`, group)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public deleteGroup(id: number) {
    return this.http.delete(`/api/hass/group/${id}`)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public getAllCards() {
    return this.http.get(`/api/hass/card`)
  }

  public getCardsByGroup(groupId: number) {
    return this.http.get(`/api/hass/card?group=${groupId}`)
  }

  public createCard(card: any) {
    return this.http.post(`/api/hass/card`, card)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public updateCard(id: number, card: any) {
    return this.http.patch(`/api/hass/card/${id}`, card)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public deleteCard(id: number) {
    return this.http.delete(`/api/hass/card/${id}`)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public async callService(msg: ServiceCall) {
    this.connection.sendMessage(msg as MessageBase);
  }

  public getEntityHistory(entityId: string) {
    return this.http.get(
      `/api/hass/history/period?filter_entity_id=${entityId}`,
      {
        headers: this.headers,
      },
    );
  }

  public resolveStateOptions(
    state: string,
    options: StateOptions | undefined,
  ): any {
    if (!state || !options) return state;

    let newState = state;
    let dangerLevel = DangerLevel.Normal;

    if (options.round && !isNaN(+newState)) {
      newState = String(Math.round(+newState));
    }

    if (
      options.warningExpression &&
      Function('return ' + `"${newState}"` + options.warningExpression)()
    ) {
      dangerLevel = DangerLevel.Warning;
    }

    if (
      options.dangerExpression &&
      Function('return ' + `"${newState}"` + options.dangerExpression)()
    ) {
      dangerLevel = DangerLevel.Danger;
    }

    if (options.beforeString) {
      newState = options.beforeString + newState;
    }

    if (options.afterString) {
      newState = newState + options.afterString;
    }

    return {
      state: newState,
      dangerLevel,
    };
  }

  private async connect() {
    const auth = createLongLivedTokenAuth(
      environment.hassUrl,
      environment.hassAccessToken,
    );

    this.connection = await createConnection({ auth });
    subscribeEntities(this.connection, (ent) => this._entities.next(ent));
  }
}

export enum DangerLevel {
  Normal,
  Warning,
  Danger,
}
