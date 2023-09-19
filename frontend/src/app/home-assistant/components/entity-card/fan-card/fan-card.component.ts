import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { FanDetailComponent } from '../../fan-detail/fan-detail.component';
import { EntityCardComponent } from '../entity-card.component';

@Component({
  selector: 'app-fan-card',
  templateUrl: './fan-card.component.html',
  styleUrls: ['./fan-card.component.scss'],
})
export class FanCardComponent extends EntityCardComponent {
  constructor(
    hassService: HassService,
    private dialog: MatDialog,
  ) {
    super(hassService);
  }

  public onRightMouseClick() {
    this.dialog.open(FanDetailComponent, {
      width: '500px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {
        entityId: this.entity?.entity_id,
        entityName: this.entityName,
        isActive: this.isActive,
      },
    });
    return false;
  }
}
