import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss'],
})
export class SensorCardComponent extends EntityCardComponent {
  constructor(hassService: HassService, dialog: MatDialog) {
    super(hassService, dialog);
  }
}
