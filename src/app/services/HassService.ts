import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from 'home-assistant-js-websocket';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HassService {
  public entities: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private connection: any;

  constructor() {
    this.connect();
  }

  private async connect() {
    const auth = createLongLivedTokenAuth(
      environment.hassUrl,
      environment.authToken.access_token
    );

    this.connection = await createConnection({ auth });
    subscribeEntities(this.connection, (ent) => this.entities.next(ent));
  }

  public async callService(msg: any) {
    this.connection.sendMessage(msg);
  }

  public resolveStateOptions(state: string, options: StateOptions): string {
    if (!state || !options) return state;

    let newState = state;
    if (options.round && !isNaN(+newState)) {
      newState = String(Math.round(+newState));
    }

    if (options.beforeString) {
      newState = options.beforeString + newState;
    }

    if (options.afterString) {
      newState = newState + options.afterString;
    }

    return newState;
  }
}

export interface ServiceCall {
  type: string;
  domain: string;
  service: string;
  service_data?: any;
  target: {
    entity_id?: string;
    area_id?: string;
    device_id?: string;
  };
}

export interface StateOptions {
  round?: boolean;
  beforeString?: string;
  afterString?: string;
}
