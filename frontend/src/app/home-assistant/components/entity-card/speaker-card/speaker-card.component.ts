import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { SpeakerDetailComponent } from '../../speaker-detail/speaker-detail.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DemoHassService } from 'src/app/home-assistant/services/demo-hass.service';

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
})
export class SpeakerCardComponent extends EntityCardComponent {
  constructor(
    hassService: HassService,
    auth: AuthService,
    demoService: DemoHassService,
    dialog: MatDialog
  ) {
    super(hassService, auth, demoService, dialog);
  }

  public onRightMouseClick() {
    this.dialog.open(SpeakerDetailComponent, {
      width: '70%',
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
