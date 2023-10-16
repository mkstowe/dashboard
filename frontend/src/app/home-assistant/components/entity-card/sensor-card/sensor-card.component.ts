import { Component } from '@angular/core';
import { EntityCardComponent } from '../entity-card.component';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { DemoHassService } from 'src/app/home-assistant/services/demo-hass.service';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss'],
})
export class SensorCardComponent extends EntityCardComponent {
  constructor(
    hassService: HassService,
    auth: AuthService,
    demoService: DemoHassService,
    dialog: MatDialog
  ) {
    super(hassService, auth, demoService, dialog);
  }
}
