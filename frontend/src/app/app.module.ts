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
import { SharedModule } from './shared/shared.module';
import { MusicModule } from './music/music.module';
import { HomeAssistantModule } from './home-assistant/home-assistant.module';
import { RecipesModule } from './recipes/recipes.module';
import { MaterialModule } from './material.module';
import { AuthModule } from '@auth0/auth0-angular';

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
    SharedModule,
    MusicModule,
    HomeAssistantModule,
    RecipesModule,
    MaterialModule,

    AuthModule.forRoot({
      domain: 'dev-1fguvr6cw0f84i24.us.auth0.com',
      clientId: 'pR9aUf1ppRpE1hmHhokLwvS0LYiKPTc1',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
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
