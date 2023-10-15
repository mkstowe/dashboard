import { Injectable } from '@angular/core';
import { ServiceCall } from '../models/service-call';
import { HassService } from './hass.service';
import { switchMap } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class DemoHassService {
  constructor(private hassService: HassService) { }

  public callService(msg: ServiceCall) {
    if (msg.service === 'toggle') {
      this.toggle((msg.target.entity_id || msg.target.area_id || msg.target.device_id)!)
    }
  }

  private toggle(entityId: string) {
    this.hassService.getCardByEntityId(entityId).pipe(
      switchMap((res: any) => {
        const value: Partial<Card> = {
          state: res.card.state === 'on' ? 'off' : 'on'
        }

        return this.hassService.updateCard(res.card.id, value)
      })
    ).subscribe()
  }
}