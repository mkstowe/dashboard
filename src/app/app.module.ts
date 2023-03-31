import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HassService } from './services/HassService';
import { HttpClientModule } from '@angular/common/http';
import { MusicPageComponent } from './components/music-page/music-page.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, HomePageComponent, MusicPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HassService],
  bootstrap: [AppComponent],
})
export class AppModule {}
