import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { LightOptionsComponent } from './components/light-options/light-options.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorGroupComponent } from './components/sensor-group/sensor-group.component';
import { StateGraphComponent } from './components/state-graph/state-graph.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { LightCardComponent } from './components/entity-card/light-card/light-card.component';
import { TvCardComponent } from './components/entity-card/tv-card/tv-card.component';
import { TvDetailComponent } from './components/tv-detail/tv-detail.component';

@NgModule({
  declarations: [
    CardGridComponent,
    EntityCardComponent,
    LightCardComponent,
    LightOptionsComponent,
    SensorComponent,
    SensorGroupComponent,
    StateGraphComponent,
    HomePageComponent,
    TvCardComponent,
    TvDetailComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HomePageComponent],
})
export class HomeAssistantModule {}
