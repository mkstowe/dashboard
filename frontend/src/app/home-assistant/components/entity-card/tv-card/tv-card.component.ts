import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { TvDetailComponent } from '../../tv-detail/tv-detail.component';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent extends EntityCardComponent {
  constructor(hassService: HassService, private dialog: MatDialog) {
    super(hassService);
  }
  public onRightMouseClick() {
    this.dialog.open(TvDetailComponent, {
      width: '70%',
      height: '80%',
      data: {
        entity: this.entity,
        entityName: this.entityName,
        isActive: this.isActive,
      },
    });
    return false;
  }
}
