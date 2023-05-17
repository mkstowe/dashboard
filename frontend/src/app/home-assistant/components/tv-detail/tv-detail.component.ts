import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { HassService } from '../../services/hass.service';
import { ServiceCall } from '../../models/service-call';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TvDetailComponent implements OnInit {
  public entity: any;
  public entityName: string;
  public isActive: boolean;

  private entityUpdate: Subject<any> = new Subject<any>();



  constructor(private hassService: HassService, @Inject(MAT_DIALOG_DATA) data: { entity: any; entityName: string; isActive: boolean }) {
    this.entity = data.entity;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: () => {
        return;
      }
    });

    this.entityUpdate.next(null);
  }

  public onPowerClick() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'remote',
      service: 'toggle',
      target: {
        entity_id: this.entity.entity_id,
      }
    }

    this.hassService.callService(service);

    this.entityUpdate.next(null);
  }


}
