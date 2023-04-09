import { Component, Input, OnInit } from '@angular/core';
import { HassService, StateOptions } from 'src/app/services/HassService';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
})
export class SensorComponent implements OnInit {
  @Input() entityId: string;
  @Input() icon: string;
  @Input() name: string;
  @Input() state: string;
  @Input() cardOptions: any;
  @Input() stateOptions: StateOptions;

  public entity: any;
  public entityName: string;
  public entityState: string;

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: (result) => {
        this.entity = result[this.entityId || this.cardOptions?.entityId];
        this.entityName =
          this.name ||
          this.cardOptions?.name ||
          this.entity?.attributes.friendly_name;
        this.entityState =
          this.state || this.cardOptions?.state || this.entity?.state;

        this.entityState = this.hassService.resolveStateOptions(
          this.entityState,
          this.stateOptions
        );
      },
    });
  }
}
