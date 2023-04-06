import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HassService } from './services/HassService';
import { HttpClientModule } from '@angular/common/http';
import { MusicPageComponent } from './components/music-page/music-page.component';

import { SensorComponent } from './components/sensor/sensor.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { MaterialModule } from './shared/material.module';
import { IconModule } from './shared/icon.module';
import { LightCardComponent } from './components/entity-card/light-card/light-card.component';
import { CardGroupComponent } from './components/card-group/card-group.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, HomePageComponent, MusicPageComponent, EntityCardComponent, SensorComponent, LightCardComponent, CardGroupComponent, ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, MaterialModule, IconModule],
  providers: [HassService],
  bootstrap: [AppComponent],
})
export class AppModule {}
