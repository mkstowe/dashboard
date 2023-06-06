import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantModalComponent } from '../../components/add-plant-modal/add-plant-modal.component';
import { PlantService } from '../../services/plant.service';

@Component({
  templateUrl: './plants-page.component.html',
  styleUrls: ['./plants-page.component.scss']
})
export class PlantsPageComponent implements OnInit {

  constructor(private plantService: PlantService, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.plantService.getAllPlants().subscribe((res) => {
        console.log(res);
      })
  }

  public onAddPlant() {
    this.dialog.open(AddPlantModalComponent, {
      width: '700px',
      height: '90%'
    });
  }
}
