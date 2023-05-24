import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, delay, takeUntil } from 'rxjs';
import { HassService } from '../../services/hass.service';
import { ServiceCall } from '../../models/service-call';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HassEntity } from 'home-assistant-js-websocket';

@Component({
  selector: 'app-light-detail',
  templateUrl: './light-detail.component.html',
  styleUrls: ['./light-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LightDetailComponent implements OnInit, OnDestroy {
  public entity: HassEntity;
  public entityId: string;
  public entityName: string;
  public isActive: boolean;

  public brightness: number;
  public color: string | null;
  public min = 0;
  public max = 255;
  public showLabel = true;

  public presetColors = ['#ffc791', '#ff0000'];

  private notifier$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    @Inject(MAT_DIALOG_DATA)
    data: {
      entityId: string;
      entityName: string;
      isActive: boolean;
    }
  ) {
    this.entityId = data.entityId;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (res) => {
        this.entity = res[this.entityId];

        this.brightness = this.entity?.attributes.brightness || 0;

        const rgbColor: number[] = this.entity?.attributes.rgb_color;
        this.color = rgbToHex(rgbColor) || null;
      },
    });

    // this.entityUpdate.pipe(delay(500), takeUntil(this.notifier$)).subscribe({
    //   next: () => {
    //     const rgbColor: number[] = this.entity.attributes.rgb_color;
    //     this.color = rgbToHex(rgbColor) || null;
    //   },
    // });

    // this.entityUpdate.next(null);
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public onPowerClick() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'light',
      service: 'toggle',
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);

  }

  public onBrightnessChange($event: Event) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'light',
      service: 'turn_on',
      service_data: {
        brightness: ($event.target as HTMLInputElement).value,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);

  }

  public formatFunction(value: number) {
    const percent = Math.round((value / this.max) * 100);
    return `${percent}%`;
  }

  public onColorChange($event: string) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'light',
      service: 'turn_on',
      service_data: {
        rgb_color: hexToRgb($event),
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }
}

function rgbToHex(rgb: number[]) {
  if (!rgb) return null;

  return (
    '#' +
    rgb
      ?.map((c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}
