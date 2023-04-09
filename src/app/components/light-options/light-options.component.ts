import { Component, Input, OnInit } from '@angular/core';
import { HassService, ServiceCall } from 'src/app/services/HassService';

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
  public min = 0;
  public max = 255;
  public showLabel = true;

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: () => {
        this.brightness = this.entity?.attributes.brightness || 0;
      },
    });
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
  }

  public formatFunction(value: number) {
    const percent = Math.round((value / this.max) * 100);
    return `${percent}%`;
  }
}
