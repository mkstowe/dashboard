import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from 'home-assistant-js-websocket';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceCall } from '../models/service-call';
import { StateOptions } from '../models/state-options';

@Injectable({
  providedIn: 'root',
})
export class HassService {
  public entities: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private connection: any;

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.hassAuthToken.access_token}`,
  });

  constructor(private http: HttpClient) {
    this.connect();
  }

  private async connect() {
    const auth = createLongLivedTokenAuth(
      environment.hassUrl,
      environment.hassAuthToken.access_token
    );

    this.connection = await createConnection({ auth });
    subscribeEntities(this.connection, (ent) => this.entities.next(ent));
  }

  public async callService(msg: ServiceCall) {
    this.connection.sendMessage(msg);
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

  public getEntityHistory(entityId: string) {
    return this.http.get(
      `/api/hass/history/period?filter_entity_id=${entityId}`,
      {
        headers: this.headers,
      }
    );
  }
}

export enum DangerLevel {
  Normal,
  Warning,
  Danger,
}
