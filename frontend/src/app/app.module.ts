import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { IconModule } from './icon.module';

import * as Hammer from 'hammerjs';
import {
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { MusicModule } from './music/music.module';
import { HomeAssistantModule } from './home-assistant/home-assistant.module';
import { RecipesModule } from './recipes/recipes.module';
import { MaterialModule } from './material.module';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  public override = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    IconModule,
    HammerModule,
    CoreModule,
    MusicModule,
    HomeAssistantModule,
    RecipesModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
