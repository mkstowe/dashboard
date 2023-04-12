import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from 'home-assistant-js-websocket';
import { BehaviorSubject } from 'rxjs';
import { ServiceCall, StateOptions } from '../shared/core.models';

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

  public async callService(msg: ServiceCall) {
    this.connection.sendMessage(msg);
  }

  public resolveStateOptions(state: string, options: StateOptions | undefined): string {
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
