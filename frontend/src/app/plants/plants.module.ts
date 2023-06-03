import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PlantsPageComponent } from './pages/plants-page/plants-page.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';



@NgModule({
  declarations: [
    PlantsPageComponent,
    PlantCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class PlantsModule { }
