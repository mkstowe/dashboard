import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlantActionModalComponent } from '../plant-action-modal/plant-action-modal.component';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent {
  @Input() id: number;
  @Input() name: string | undefined;
  @Input() scientificName: string | undefined;
  @Input() lastWatered: Date | undefined;
  @Input() lastFertilized: Date | undefined;

  constructor(private dialog: MatDialog) { }

  onRightMouseClick() {
    this.dialog.open(PlantActionModalComponent, {
      width: '500px',
      autoFocus: false,
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {
        id: this.id,
        lastWatered: this.lastWatered,
        lastFertilized: this.lastFertilized
      }
    })
    return false;
  }
}
