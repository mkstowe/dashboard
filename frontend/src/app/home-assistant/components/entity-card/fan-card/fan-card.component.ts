import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { FanDetailComponent } from '../../fan-detail/fan-detail.component';
import { EntityCardComponent } from '../entity-card.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DemoHassService } from 'src/app/home-assistant/services/demo-hass.service';

@Component({
  selector: 'app-fan-card',
  templateUrl: './fan-card.component.html',
  styleUrls: ['./fan-card.component.scss'],
})
export class FanCardComponent extends EntityCardComponent {
  constructor(hassService: HassService, auth: AuthService, demoService: DemoHassService, dialog: MatDialog) {
    super(hassService, auth, demoService, dialog);
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
