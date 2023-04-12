import { Component, Input, OnInit } from '@angular/core';
import { HassService } from 'src/app/services/HassService';
import { SensorOptions, StateOptions } from 'src/app/shared/core.models';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
})
export class SensorComponent implements OnInit {
  @Input() entityId: string;
  // @Input() icon: string;
  @Input() name: string;
  @Input() state: string;
  @Input() cardOptions: any;
  @Input() stateOptions: StateOptions;
  @Input() sensorOptions: SensorOptions;

  public entity: any;
  public entityName: string;
  public entityState: string;
  public icon: string;

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: (result) => {
        // this.entity = result[this.entityId || this.cardOptions?.entityId];
        this.entity = result[this.sensorOptions.entityId];
        this.entityName =
          // this.name ||
          this.sensorOptions?.name ||
          this.entity?.attributes.friendly_name;
        this.entityState =
          // this.state ||
          this.sensorOptions?.state || this.entity?.state;

        this.entityState = this.hassService.resolveStateOptions(
          this.entityState,
          this.sensorOptions?.stateOptions
        );
        this.icon = this.sensorOptions.icon || '';
      },
    });
  }
}
