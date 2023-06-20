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
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceCall } from '../models/service-call';
import { StateOptions } from '../models/state-options';

@Injectable({
  providedIn: 'root',
})
export class HassService {
  public readonly entities: Observable<HassEntities>;

  private _entities: BehaviorSubject<HassEntities> =
    new BehaviorSubject<HassEntities>({});
  private connection: Connection;
  // private headers: HttpHeaders = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // Authorization: `Bearer ${environment.hassAuthToken.access_token}`,
  // });

  private hassUrl: string;
  private hassToken: string;

  constructor(private http: HttpClient) {
    this.entities = this._entities.asObservable();
    this.connect();
  }

  public async callService(msg: ServiceCall) {
    this.connection.sendMessage(msg as MessageBase);
  }

  public getEntityHistory(entityId: string) {
    return this.http.get(
      `/api/hass/history/period?filter_entity_id=${entityId}`,
      // {
        // headers: this.headers,
      // }
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
    const data: any = await firstValueFrom(this.http.get('/hass/token'));
    const auth = createLongLivedTokenAuth(
      data.hassUrl,
      data.hassToken
    )

    this.connection = await createConnection({ auth });
    subscribeEntities(this.connection, (ent) => this._entities.next(ent));
  }
}

export enum DangerLevel {
  Normal,
  Warning,
  Danger,
}
