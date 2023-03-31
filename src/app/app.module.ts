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

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion'; 

@NgModule({
  declarations: [AppComponent, SidebarComponent, HomePageComponent, MusicPageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, MatButtonModule, MatExpansionModule],
  providers: [HassService],
  bootstrap: [AppComponent],
})
export class AppModule {}
