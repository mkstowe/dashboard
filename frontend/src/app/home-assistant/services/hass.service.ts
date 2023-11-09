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
import { CardGroup } from '../models/card-group';
import { Card } from '../models/card';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HassService {
  public readonly entities: Observable<HassEntities>;
  public isDemo: boolean;
  private refetchSubject = new BehaviorSubject(null);
  private _editMode = new BehaviorSubject<boolean>(false);
  private _entities: BehaviorSubject<HassEntities> =
    new BehaviorSubject<HassEntities>({});
  private connection: Connection;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.entities = this._entities.asObservable();

    this.auth.isDemo$.subscribe((isDemo) => {
      this.isDemo = isDemo;

      if (!this.isDemo) {
        this.connect();
      }
    });
  }

  public get refetch() {
    return this.refetchSubject.asObservable();
  }

  public get editMode$(): Observable<boolean> {
    return this._editMode.asObservable();
  }

  public setEditMode(val: boolean) {
    this._editMode.next(val);
  }

  public getAllGroups() {
    return this.http.get<CardGroup[]>(`/api/hass/groups`);
  }

  public createGroup(group: CardGroup) {
    return this.http
      .post<CardGroup>(`/api/hass/group`, group)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public updateGroup(id: number, group: Partial<CardGroup>) {
    return this.http
      .patch<Partial<CardGroup>>(`/api/hass/group/${id}`, group)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public deleteGroup(id: number) {
    return this.http
      .delete(`/api/hass/group/${id}`)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public reorderGroups(groups: any) {
    return this.http.post(`/api/hass/groups/reorder`, groups)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public getAllCards() {
    return this.http.get<Card[]>(`/api/hass/cards`);
  }

  public getCardsByGroup(groupId: number) {
    return this.http.get<Card[]>(`/api/hass/cards?group=${groupId}`);
  }

  public getCardByEntityId(entityId: string) {
    return this.http.get<Card>(`/api/hass/card?entityId=${entityId}`);
  }

  public createCard(card: Card) {
    return this.http
      .post<Card>(`/api/hass/card`, card)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public updateCard(id: number, card: Partial<Card>) {
    return this.http
      .patch<Partial<Card>>(`/api/hass/card/${id}`, card)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public deleteCard(id: number) {
    return this.http
      .delete(`/api/hass/card/${id}`)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public reorderCards(cards: any) {
    return this.http.post(`/api/hass/cards/reorder`, cards)
    .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public getSensorsByCard(cardId: number) {
    return this.http.get<any[]>(`/api/hass/sensors?card=${cardId}`);
  }

  public createSensor(sensor: any) {
    return this.http
      .post(`/api/hass/sensor`, sensor)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public updateSensor(id: number, sensor: any) {
    return this.http
      .patch(`/api/hass/sensor/${id}`, sensor)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public deleteSensor(id: number) {
    return this.http
      .delete(`/api/hass/sensor/${id}`)
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  public getSidebarEntities() {
    return this.http.get(`/api/hass/sidebar`);
  }

  public async callService(msg: ServiceCall) {
    this.connection.sendMessage(msg as MessageBase);
  }

  public getEntityHistory(entityId: string) {
    return this.http.get(
      `/api/hass/history/period?filter_entity_id=${entityId}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${environment.hassAccessToken}`,
        }),
      }
    );
  }

  public resolveStateOptions(
    state: string,
    options: StateOptions | undefined
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
      environment.hassAccessToken
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
