import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';
import { MatDialog } from '@angular/material/dialog';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { LightDetailComponent } from '../../light-detail/light-detail.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DemoHassService } from 'src/app/home-assistant/services/demo-hass.service';

@Component({
  selector: 'app-light-card',
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss'],
})
export class LightCardComponent extends EntityCardComponent {
  constructor(
    hassService: HassService,
    auth: AuthService,
    demoService: DemoHassService,
    dialog: MatDialog
  ) {
    super(hassService, auth, demoService, dialog);
  }

  public onRightMouseClick() {
    this.dialog.open(LightDetailComponent, {
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
