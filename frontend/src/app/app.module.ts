import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HassService } from './services/hass.service';
import { HttpClientModule } from '@angular/common/http';
import { MusicPageComponent } from './components/music-page/music-page.component';

import { SensorComponent } from './components/sensor/sensor.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { MaterialModule } from './shared/material.module';
import { IconModule } from './shared/icon.module';
import { LightCardComponent } from './components/entity-card/light-card/light-card.component';
import { SensorGroupComponent } from './components/sensor-group/sensor-group.component';
import { LightOptionsComponent } from './components/light-options/light-options.component';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgChartsModule } from 'ng2-charts';
import { StateGraphComponent } from './components/state-graph/state-graph.component';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';

import * as Hammer from 'hammerjs';
import {
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    MusicPageComponent,
    EntityCardComponent,
    SensorComponent,
    LightCardComponent,
    SensorGroupComponent,
    LightOptionsComponent,
    CardGridComponent,
    StateGraphComponent,
    PlaylistCardComponent,
    MediaPlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    IconModule,
    ColorPickerModule,
    NgChartsModule,
    HammerModule,
  ],
  providers: [
    HassService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
