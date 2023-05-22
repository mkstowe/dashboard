import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { HassService } from '../../services/hass.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceCall } from '../../models/service-call';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpeakerDetailComponent implements OnInit {
  public entity: any;
  public entityName: string;
  public isActive: boolean;

  private entityUpdate: Subject<any> = new Subject<any>();

  constructor(
    private hassService: HassService,
    @Inject(MAT_DIALOG_DATA)
    data: { entity: any; entityName: string; isActive: boolean }
  ) {
    this.entity = data.entity;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: () => {
        return;
      },
    });

    this.entityUpdate.next(null);
  }

  public onPowerClick() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'media_player',
      service: 'toggle',
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);

    this.entityUpdate.next(null);
  }

  public transferPlayback() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'script',
      service: 'transfer_spotify_playback',
      service_data: {
        player: this.entity.attributes.friendly_name
      },
      target: {
        entity_id: 'script.transfer_spotify_playback'
      }
    }

    this.hassService.callService(service);
    this.entityUpdate.next(null);
  }
}
