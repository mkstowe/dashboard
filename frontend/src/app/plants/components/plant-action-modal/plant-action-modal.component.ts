import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plant-action-modal',
  templateUrl: './plant-action-modal.component.html',
  styleUrls: ['./plant-action-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlantActionModalComponent {
  public lastWatered: Date | undefined;
  public lastFertilized: Date | undefined;
  private id: number;

  constructor(
    private plantService: PlantService,
    @Inject(MAT_DIALOG_DATA)
    data: {
      id: number;
      lastWatered: Date | undefined;
      lastFertilized: Date | undefined;
    }
  ) {
    this.id = data.id;
    this.lastWatered = data.lastWatered;
    this.lastFertilized = data.lastFertilized;
  }

  public onWater() {
    this.lastWatered = new Date();
    this.plantService
      .updatePlant(this.id, { lastWatered: this.lastWatered })
      .subscribe();
  }

  public onFertilize() {
    this.lastFertilized = new Date();
    this.plantService
      .updatePlant(this.id, { lastFertilized: this.lastFertilized })
      .subscribe();
  }
}
