import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { LightDetailComponent } from './components/light-detail/light-detail.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorGroupComponent } from './components/sensor-group/sensor-group.component';
import { StateGraphComponent } from './components/state-graph/state-graph.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { LightCardComponent } from './components/entity-card/light-card/light-card.component';
import { TvCardComponent } from './components/entity-card/tv-card/tv-card.component';
import { TvDetailComponent } from './components/tv-detail/tv-detail.component';
import { SpeakerCardComponent } from './components/entity-card/speaker-card/speaker-card.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';
import { MusicModule } from '../music/music.module';

@NgModule({
  declarations: [
    CardGridComponent,
    EntityCardComponent,
    LightCardComponent,
    LightDetailComponent,
    SensorComponent,
    SensorGroupComponent,
    StateGraphComponent,
    HomePageComponent,
    TvCardComponent,
    TvDetailComponent,
    SpeakerCardComponent,
    SpeakerDetailComponent,
  ],
  imports: [CommonModule, SharedModule, MusicModule],
  exports: [HomePageComponent],
})
export class HomeAssistantModule {}
