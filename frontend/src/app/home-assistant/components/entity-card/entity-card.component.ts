import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DangerLevel, HassService } from '../../services/hass.service';
import { Subject, takeUntil } from 'rxjs';
import { HassEntity } from 'home-assistant-js-websocket';
import { MatDialog } from '@angular/material/dialog';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
})
export class EntityCardComponent implements OnInit, OnDestroy {
  @Input() public card: any;

  public entity: HassEntity | undefined;
  public entityName: string;
  public entityState: string;
  public hasAction: boolean;
  public icon: string;
  public iconActive: string;
  public isActive: boolean;
  public unlocked: boolean;
  public sensors: any[];
  public editMode = false;
  public dangerLevel: DangerLevel = DangerLevel.Normal;
  public dangerLevels = DangerLevel;

  private lockTimer: number;
  private notifier$ = new Subject<void>();
  private onStates = ['on', 'playing'];

  constructor(private hassService: HassService, public dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (result) => {
        this.entity = this.card && result[this.card.entityId];
        this.entityName =
          this.card?.name || this.entity?.attributes.friendly_name || '';
        this.entityState = this.card?.state || this.entity?.state || '';
        this.icon = this.card?.icon || '';
        this.iconActive = this.card?.iconActive || '';

        if (this.onStates.includes(this.entityState)) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }

        if (this.card.stateOptions) {
          const state = this.hassService.resolveStateOptions(
            this.entityState,
            JSON.parse(this.card.stateOptions as string)
          );

          if (state) {
            this.entityState = state.state;
            this.dangerLevel = state.dangerLevel;
          }
        }
      },
    });

    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    });

    if (this.card?.service) {
      this.hasAction = true;
    }

    this.sensors = this.card?.sensors;
  }

  public onButtonClick($event: Event) {
    if (this.editMode) return;

    const service = JSON.parse(this.card?.service);
    if (!this.card?.lock || this.unlocked) {
      const msg = {
        type: service.type || 'call_service',
        domain: service.domain || service.entityId?.split('.')[0],
        service: service.service || '',
        service_data: service.service_data,
        target: service.target || {
          entity_id: this.card?.entityId,
        },
      };

      this.hassService.callService(msg);
    }

    if (this.card?.lock && !this.unlocked) {
      $event.stopPropagation();
      this.unlocked = true;
    }

    clearTimeout(this.lockTimer);
    this.startLockTimer();
  }

  public editCard() {
    this.dialog.open(AddCardModalComponent, {
      width: '700px',
      height: '90%',
      maxHeight: '1200px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      disableClose: true,
      data: {
        card: this.card,
      },
    });
  }

  private startLockTimer() {
    if (this.editMode) return;

    this.lockTimer = window.setTimeout(() => (this.unlocked = false), 5000);
  }
}
