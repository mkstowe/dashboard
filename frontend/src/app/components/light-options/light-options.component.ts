import { Component, Input, OnInit } from '@angular/core';
import { Subject, delay } from 'rxjs';
import { HassService } from 'src/app/services/hass.service';
import { ServiceCall } from 'src/app/shared/core.models';

@Component({
  selector: 'app-light-options',
  templateUrl: './light-options.component.html',
  styleUrls: ['./light-options.component.scss'],
})
export class LightOptionsComponent implements OnInit {
  @Input() entity: any;
  @Input() name: string;
  @Input() state: string;
  @Input() active: boolean;

  public brightness: number;
  public color: string | null;
  public min = 0;
  public max = 255;
  public showLabel = true;

  public presetColors = ['#ffc791', '#ff0000'];

  private entityUpdate: Subject<any> = new Subject<any>();

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: () => {
        this.brightness = this.entity?.attributes.brightness || 0;
      },
    });

    this.entityUpdate.pipe(delay(500)).subscribe({
      next: () => {
        const rgbColor: number[] = this.entity.attributes.rgb_color;
        this.color = rgbToHex(rgbColor) || null;
      },
    });

    this.entityUpdate.next(null);
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

    this.entityUpdate.next(null);
  }

  public onBrightnessChange($event: any) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'light',
      service: 'turn_on',
      service_data: {
        brightness: $event.target.value,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);

    this.entityUpdate.next(null);
  }

  public formatFunction(value: number) {
    const percent = Math.round((value / this.max) * 100);
    return `${percent}%`;
  }

  public onColorChange($event: any) {
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
