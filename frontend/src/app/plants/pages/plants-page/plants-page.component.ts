import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantModalComponent } from '../../components/add-plant-modal/add-plant-modal.component';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { Observable, switchMap } from 'rxjs';

@Component({
  templateUrl: './plants-page.component.html',
  styleUrls: ['./plants-page.component.scss'],
})
export class PlantsPageComponent implements OnInit {
  public plants: Observable<Plant[]>;

  constructor(
    private plantService: PlantService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.plants = this.plantService.refetch.pipe(
      switchMap(() => this.plantService.getAllPlants()),
    );
  }

  public onAddPlant() {
    this.dialog.open(AddPlantModalComponent, {
      width: '700px',
      height: '90%',
      maxHeight: '1200px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      disableClose: true
    });
  }
}
