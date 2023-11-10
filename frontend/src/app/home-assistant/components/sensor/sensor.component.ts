import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DangerLevel, HassService } from '../../services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { StateGraphComponent } from '../state-graph/state-graph.component';
import { StateOptions } from '../../models/state-options';
import { SensorOptions } from '../../models/sensor-options';
import { Subject, takeUntil } from 'rxjs';
import { HassEntity } from 'home-assistant-js-websocket';
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
})
export class SensorComponent implements OnInit, OnDestroy {
  @Input() public sensorOptions: SensorOptions;
  @Input() public stateOptions: StateOptions;

  public dangerLevel: DangerLevel = DangerLevel.Normal;
  public dangerLevels = DangerLevel;
  public entity: HassEntity;
  public entityName: string;
  public entityState: string;
  public icon: string;
  public stateActive: boolean;

  private editMode: boolean = false;
  private notifier$ = new Subject<void>();

  constructor(private hassService: HassService, private dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (result) => {
        this.entity = result[this.sensorOptions.entityId];
        this.entityName =
          this.sensorOptions?.name ||
          this.entity?.attributes.friendly_name ||
          '';
        this.entityState = this.sensorOptions?.state || this.entity?.state;

        if (this.sensorOptions.stateOptions) {
          this.stateActive = this.sensorOptions.stateOptions.active ?? true;

          let state;
          if (this.stateActive) {
            state = this.hassService.resolveStateOptions(
              this.entityState,
              this.sensorOptions?.stateOptions
            );
          }

          if (state) {
            this.entityState = state.state;
            this.dangerLevel = state.dangerLevel;
          }
        }

        this.icon = this.sensorOptions.icon || '';
      },
    });

    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    });
  }

  public onRightMouseClick() {
    if (!this.sensorOptions.enableGraph || this.editMode) return;

    this.dialog.open(StateGraphComponent, {
      width: '70%',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {
        entity: this.entity,
        entityName: this.entityName,
        stateOptions: this.sensorOptions.stateOptions,
      },
    });
    return false;
  }
}
