import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MediaPlayerComponent,
    PlaylistCardComponent,
    MusicPageComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [MediaPlayerComponent, MusicPageComponent],
})
export class MusicModule {}
