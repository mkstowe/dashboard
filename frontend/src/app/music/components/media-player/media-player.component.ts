import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, first, interval, map, switchMap, takeUntil } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../models/track';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  public currProgress: number;
  public currentTrack: Track;
  public isPlaying: boolean;
  public volume: number;

  private notifier$ = new Subject<void>();

  constructor(private spotifyService: SpotifyService) {}

  public formatFunction(value: number) {
    return `${value}%`;
  }

  public nextTrack() {
    this.spotifyService.nextTrack().pipe(first()).subscribe();
  }

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.getCurrentTrack().subscribe();
    interval(1000)
      .pipe(
        takeUntil(this.notifier$),
        switchMap(() => this.getCurrentTrack())
      )
      .subscribe();

    return;
  }

  public onVolumeChange($event: Event) {
    this.spotifyService
      .setVolume(+($event.target as HTMLInputElement).value)
      .pipe(first())
      .subscribe();
  }

  public previousTrack() {
    this.spotifyService.previousTrack().pipe(first()).subscribe();
  }

  public togglePlayback() {
    this.isPlaying
      ? this.spotifyService.pausePlayback().pipe(first()).subscribe()
      : this.spotifyService.startPlayback().pipe(first()).subscribe();
  }

  private getCurrentTrack() {
    return this.spotifyService.getPlaybackState().pipe(
      map((res: any) => {
        this.currentTrack = res && {
          title: res?.item?.name,
          artist: res?.item?.artists[0].name,
          album: res?.item?.album.name,
          duration: res?.item?.duration_ms,
          cover: res?.item?.album.images[0].url,
          isPlaying: res?.is_playing,
          progress: res?.progress_ms,
        };

        this.currProgress = (+res?.progress_ms / +res?.item.duration_ms) * 100;
        this.volume = res?.device.volume_percent;
        this.isPlaying = res?.is_playing;
      })
    );
  }
}
