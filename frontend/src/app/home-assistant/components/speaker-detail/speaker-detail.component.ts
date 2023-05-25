import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HassService } from '../../services/hass.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceCall } from '../../models/service-call';
import { HassEntity } from 'home-assistant-js-websocket';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpeakerDetailComponent implements OnInit, OnDestroy {
  public entity: HassEntity;
  public entityId: string;
  public entityName: string;
  public isActive: boolean;

  private notifier$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    @Inject(MAT_DIALOG_DATA)
    data: { entityId: string; entityName: string; isActive: boolean }
  ) {
    this.entityId = data.entityId;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (res) => {
        this.entity = res[this.entityId];
      },
    });
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
  }

  public transferPlayback() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'script',
      service: 'transfer_spotify_playback',
      service_data: {
        player: this.entity.attributes.friendly_name,
      },
      target: {
        entity_id: 'script.transfer_spotify_playback',
      },
    };

    this.hassService.callService(service);
  }
}
