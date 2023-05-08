import { Component, Input, OnInit } from '@angular/core';
import { DangerLevel, HassService } from '../../services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { StateGraphComponent } from '../state-graph/state-graph.component';
import { StateOptions } from '../../models/state-options';
import { SensorOptions } from '../../models/sensor-options';
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
})
export class SensorComponent implements OnInit {
  @Input() stateOptions: StateOptions;
  @Input() sensorOptions: SensorOptions;

  public entity: any;
  public entityName: string;
  public entityState: string;
  public dangerLevel: DangerLevel = DangerLevel.Normal;
  public icon: string;

  public dangerLevels = DangerLevel;

  constructor(private hassService: HassService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: (result) => {
        this.entity = result[this.sensorOptions.entityId];
        this.entityName =
          this.sensorOptions?.name || this.entity?.attributes.friendly_name;
        this.entityState = this.sensorOptions?.state || this.entity?.state;

        if (this.sensorOptions.stateOptions) {
          const state = this.hassService.resolveStateOptions(
            this.entityState,
            this.sensorOptions?.stateOptions
          );

          if (state) {
            this.entityState = state.state;
            this.dangerLevel = state.dangerLevel;
          }
        }

        this.icon = this.sensorOptions.icon || '';
      },
    });
  }

  public onRightMouseClick() {
    if (!this.sensorOptions.enableGraph) return;

    this.dialog.open(StateGraphComponent, {
      width: '70%',
      data: {
        entity: this.entity,
        entityName: this.entityName,
        stateOptions: this.sensorOptions.stateOptions,
      },
    });
    return false;
  }
}
