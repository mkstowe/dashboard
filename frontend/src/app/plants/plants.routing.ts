import { Routes } from '@angular/router';
import { PlantsPageComponent } from './pages/plants-page/plants-page.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';

export const PLANT_ROUTES: Routes = [
  {
    path: '',
    component: PlantsPageComponent,
  },
  {
    path: ':id',
    component: PlantDetailComponent,
  },
];
