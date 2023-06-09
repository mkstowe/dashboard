import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PlantsPageComponent } from './pages/plants-page/plants-page.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { AddPlantModalComponent } from './components/add-plant-modal/add-plant-modal.component';
import { RouterModule } from '@angular/router';
import { PLANT_ROUTES } from './plants.routing';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';



@NgModule({
  declarations: [
    PlantsPageComponent,
    PlantCardComponent,
    AddPlantModalComponent,
    PlantDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PLANT_ROUTES)
  ],
  exports: [PlantsPageComponent]
})
export class PlantsModule { }
