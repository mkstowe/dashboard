import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HassService } from '../../services/hass.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceCall } from '../../models/service-call';
import { HassEntity } from 'home-assistant-js-websocket';

@Component({
  selector: 'app-fan-detail',
  templateUrl: './fan-detail.component.html',
  styleUrls: ['./fan-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FanDetailComponent implements OnInit {
  public currentMode: string;
  public entity: HassEntity;
  public entityId: string;
  public entityName: string;
  public fanDirections = FanDirections;
  public fanModes = FanModes;
  public isActive: boolean;
  public oscillateActive: boolean;
  public speed: number;

  private notifier$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    @Inject(MAT_DIALOG_DATA)
    data: {
      entityId: string;
      entityName: string;
      isActive: boolean;
    },
  ) {
    this.entityId = data.entityId;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  public decreaseSpeed() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'decrease_speed',
      service_data: {
        percentage_step: 5,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public formatFunction(value: number) {
    return `${value}%`;
  }

  public increaseSpeed() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'increase_speed',
      service_data: {
        percentage_step: 5,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public ngOnInit(): void {
    this.hassService.entities
      .pipe(takeUntil(this.notifier$))
      .subscribe((res) => {
        this.entity = res[this.entityId];

        this.oscillateActive = this.entity.attributes.oscillating;
        this.speed = this.entity.attributes.percentage;
        this.currentMode = this.entity.attributes.preset_mode;
      });
  }

  public onPowerClick() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'toggle',
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public rotate(direction: FanDirections) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'set_direction',
      service_data: {
        direction,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public setMode(mode: FanModes) {
    this.currentMode = mode;
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'set_preset_mode',
      service_data: {
        preset_mode: mode,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public setSpeed($event: Event) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'set_percentage',
      service_data: {
        percentage: ($event.target as HTMLInputElement).value,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public toggleOscillate() {
    this.oscillateActive = !this.oscillateActive;
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'oscillate',
      service_data: {
        oscillating: this.oscillateActive,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }
}

enum FanDirections {
  FORWARD = 'forward',
  REVERSE = 'reverse',
}

enum FanModes {
  NORMAL = 'Normal',
  NATURE = 'Nature',
}
