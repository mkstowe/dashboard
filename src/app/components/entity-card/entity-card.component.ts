import { Component, Input, OnInit } from '@angular/core';
import { HassService } from 'src/app/services/HassService';
import { CardOptions } from 'src/app/shared/core.models';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
})
export class EntityCardComponent implements OnInit {
  @Input() cardOptions: CardOptions;

  public entity: any;
  public entityName: string;
  public entityState: string;
  public icon: string;
  public iconActive: string;
  public isActive: boolean;
  public hasAction: boolean;
  public unlocked: boolean;

  private onStates = ['on', 'playing'];
  private lockTimer: any;

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: (result) => {
        this.entity = result[this.cardOptions?.entityId];
        this.entityName =
          this.cardOptions?.name || this.entity?.attributes.friendly_name;
        this.entityState = this.cardOptions?.state || this.entity?.state;
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

  public onButtonClick($event: any) {
    if (!this.cardOptions.lock || this.unlocked) {
      const msg = {
        type: this.cardOptions.service?.type || 'call_service',
        domain:
          this.cardOptions.service?.domain ||
          this.cardOptions?.entityId?.split('.')[0],
        service: this.cardOptions.service?.service || '',
        service_data: this.cardOptions.service?.service_data,
        target: this.cardOptions.service?.target || {
          entity_id: this.cardOptions.entityId,
        },
      };

      this.hassService.callService(msg);
    }

    if (this.cardOptions.lock && !this.unlocked) {
      $event.stopPropagation();
      this.unlocked = true;
    }

    clearTimeout(this.lockTimer);
    this.startLockTimer();
  }
  private startLockTimer() {
    this.lockTimer = setTimeout(() => (this.unlocked = false), 5000);
  }
}
