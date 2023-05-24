import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Subject, takeUntil } from 'rxjs';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent implements OnInit, OnDestroy {
  @Input() id: string;
  public playlist: Playlist;
  private notifier$ = new Subject<void>();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService
      .getPlaylist(this.id)
      .pipe(takeUntil(this.notifier$))
      .subscribe((res: any) => {
        this.playlist = {
          name: res.name,
          image: res.images[0].url,
          context: res.uri,
        };
      });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public onClick() {
    this.spotifyService
      .startPlayback({ contextUri: this.playlist.context })
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }
}
