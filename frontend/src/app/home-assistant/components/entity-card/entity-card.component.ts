import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HassService } from '../../services/hass.service';
import { CardOptions } from '../../models/card-options';
import { Subject, takeUntil } from 'rxjs';
import { HassEntity } from 'home-assistant-js-websocket';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
})
export class EntityCardComponent implements OnInit, OnDestroy {
  @Input() public cardOptions: CardOptions | undefined;

  public entity: HassEntity | undefined;
  public entityName: string;
  public entityState: string;
  public hasAction: boolean;
  public icon: string;
  public iconActive: string;
  public isActive: boolean;
  public unlocked: boolean;

  private lockTimer: number;
  private notifier$ = new Subject<void>();
  private onStates = ['on', 'playing'];

  constructor(private hassService: HassService) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (result) => {
        this.entity = this.cardOptions && result[this.cardOptions.entityId];
        this.entityName =
          this.cardOptions?.name || this.entity?.attributes.friendly_name || '';
        this.entityState = this.cardOptions?.state || this.entity?.state || '';
        this.icon = this.cardOptions?.icon || '';
        this.iconActive = this.cardOptions?.iconActive || '';

        if (this.onStates.includes(this.entityState)) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    });

    if (this.cardOptions?.service) {
      this.hasAction = true;
    }
  }

  public onButtonClick($event: Event) {
    if (!this.cardOptions?.lock || this.unlocked) {
      const msg = {
        type: this.cardOptions?.service?.type || 'call_service',
        domain:
          this.cardOptions?.service?.domain ||
          this.cardOptions?.entityId?.split('.')[0],
        service: this.cardOptions?.service?.service || '',
        service_data: this.cardOptions?.service?.service_data,
        target: this.cardOptions?.service?.target || {
          entity_id: this.cardOptions?.entityId,
        },
      };

      this.hassService.callService(msg);
    }

    if (this.cardOptions?.lock && !this.unlocked) {
      $event.stopPropagation();
      this.unlocked = true;
    }

    clearTimeout(this.lockTimer);
    this.startLockTimer();
  }

  private startLockTimer() {
    this.lockTimer = window.setTimeout(() => (this.unlocked = false), 5000);
  }
}
