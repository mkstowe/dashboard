import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, delay } from 'rxjs';
import { HassService } from '../../services/hass.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceCall } from '../../models/service-call';

@Component({
  selector: 'app-fan-detail',
  templateUrl: './fan-detail.component.html',
  styleUrls: ['./fan-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FanDetailComponent implements OnInit {
  public entity: any;
  public entityName: string;
  public isActive: boolean;

  public speed: number;
  public oscillateActive: boolean;
  public currentMode: string;

  private entityUpdate: Subject<any> = new Subject<any>();
  public fanDirections = FanDirections;
  public fanModes = FanModes;

  constructor(private hassService: HassService, @Inject(MAT_DIALOG_DATA) data: {
    entity: any; entityName: string; isActive: boolean
  }) {
    this.entity = data.entity;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  ngOnInit(): void {
    this.oscillateActive = this.entity.attributes.oscillating;
    this.speed = this.entity.attributes.percentage;
    this.currentMode = this.entity.attributes.preset_mode;

    this.entityUpdate.next(null);


  }

  public onPowerClick() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'toggle',
      target: {
        entity_id: this.entity.entity_id
      }
    }

    this.hassService.callService(service);

    this.entityUpdate.next(null);
  }

  public setSpeed($event: any) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'set_percentage',
      service_data: {
        percentage: $event.target.value,
      },
      target: {
        entity_id: this.entity.entity_id
      }
    }

    this.hassService.callService(service);
    this.entityUpdate.next(null);
  }

  public increaseSpeed() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'increase_speed',
      service_data: {
        percentage_step: 5
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
    this.entityUpdate.next(null);
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
this.entityUpdate.next(null);
  }

  public toggleOscillate() {
    this.oscillateActive = !this.oscillateActive;
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'fan',
      service: 'oscillate',
      service_data: {
        oscillating: this.oscillateActive
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
    this.entityUpdate.next(null);
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
    this.entityUpdate.next(null);
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
    this.entityUpdate.next(null);
  }

  public formatFunction(value: number ) {
    return `${value}%`
  }

}

enum FanDirections {
  FORWARD = "forward",
  REVERSE = "reverse"
}

enum FanModes {
  NORMAL = "Normal",
  NATURE = "Nature"
}
