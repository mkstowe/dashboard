import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HassService } from '../../services/hass.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';

@Component({
  selector: 'app-sensor-group',
  templateUrl: './sensor-group.component.html',
  styleUrls: ['./sensor-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SensorGroupComponent implements OnInit {
  public editMode = false;

  constructor(private hassService: HassService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hassService.editMode$.subscribe((res) => {
      this.editMode = res;
    });
  }

  public editCard() {
    this.dialog.open(AddCardModalComponent, {
      width: '700px',
      height: '90%',
      maxHeight: '1200px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      disableClose: true,
    });
  }
}
