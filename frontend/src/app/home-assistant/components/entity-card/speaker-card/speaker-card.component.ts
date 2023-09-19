import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { SpeakerDetailComponent } from '../../speaker-detail/speaker-detail.component';

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
})
export class SpeakerCardComponent extends EntityCardComponent {
  constructor(
    hassService: HassService,
    private dialog: MatDialog,
  ) {
    super(hassService);
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
