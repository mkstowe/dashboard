import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantModalComponent } from '../add-plant-modal/add-plant-modal.component';
import { Observable, switchMap } from 'rxjs';

@Component({
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss'],
})
export class PlantDetailComponent implements OnInit {
  public plant: Plant;
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.plantService.refetch
      .pipe(switchMap(() => this.plantService.getPlant(this.id)))
      .subscribe((res: any) => {
        this.plant = res.plant;
      });
  }

  public editPlant() {
    this.dialog.open(AddPlantModalComponent, {
      width: '700px',
      height: '90%',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {
        plant: this.plant,
      },
    });
  }

  public onWater() {
    const lastWatered = new Date();
    this.plantService.updatePlant(this.id, { lastWatered }).subscribe();
  }

  public onFertilize() {
    const lastFertilized = new Date();
    this.plantService.updatePlant(this.id, { lastFertilized }).subscribe();
  }
}
