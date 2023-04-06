import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  getAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
  createLongLivedTokenAuth,
} from 'home-assistant-js-websocket';
import { BehaviorSubject} from 'rxjs';

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
}
