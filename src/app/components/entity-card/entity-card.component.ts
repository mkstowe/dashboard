import { Component, Input, OnInit } from '@angular/core';
import {
  HassService,
} from 'src/app/services/HassService';
import { ServiceCall, StateOptions } from 'src/app/shared/core.models';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
})
export class EntityCardComponent implements OnInit {
  // @Input() entityId: string;
  // @Input() icon: string;
  // @Input() iconActive: string;
  // @Input() name: string;
  // @Input() state: string;
  // @Input() service: ServiceCall;
  // @Input() action: string;
  // @Input() serviceDomain: string;
  // @Input() serviceData: any;
  // @Input() lock: boolean;
  @Input() cardOptions: any;
  // @Input() stateOptions: StateOptions;

  public entity: any;
  public entityName: string;
  public entityState: string;
  public icon: string;
  public iconActive: string;
  public isActive: boolean;
  public hasAction: boolean;

  private onStates = ['on', 'playing'];

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: (result) => {
        this.entity = result[
          // this.entityId ||
          this.cardOptions?.entityId];
        this.entityName =
          // this.name ||
          this.cardOptions?.name ||
          this.entity?.attributes.friendly_name;
        this.entityState =
          // this.state ||
          this.cardOptions?.state || this.entity?.state;
          this.icon = this.cardOptions?.icon;
          this.iconActive = this.cardOptions?.iconActive;

        if (this.onStates.includes(this.entityState)) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }

        // this.entityState = this.hassService.resolveStateOptions(
        //   this.entityState,
        //   this.stateOptions
        // );
      },
    });

    if (
      // this.action ||
      // this.service ||
      this.cardOptions?.action ||
      this.cardOptions?.service
    ) {
      this.hasAction = true;
    }
  }

  public onButtonClick() {
    const msg =
    // this.service ||
      this.cardOptions?.service || {
        type: 'call_service',
        domain:
          // this.serviceDomain ||
          // this.entityId?.split('.')[0] ||
          this.cardOptions?.entityId?.split('.')[0],
        service:
        // this.action ||
        this.cardOptions?.action,
        service_data:
        // this.serviceData ||
        this.cardOptions?.serviceData,
        target: {
          entity_id:
          // this.entityId ||
          this.cardOptions?.entityId,
        },
      };

    this.hassService.callService(msg);
  }
}
