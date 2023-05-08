import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, first, interval, map, switchMap, takeUntil } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  public currentTrack: any;
  public volume: number;
  public currProgress: number;
  public isPlaying: boolean;
  public state = 0;

  private unsub = new Subject<void>();

  left = 0;
  @ViewChild('parentTag', { static: false })
  parentTag: ElementRef;

  @ViewChild('target', { static: false })
  target: ElementRef;

  constructor(
    private spotifyService: SpotifyService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.getCurrentTrack().subscribe();
    interval(1000)
      .pipe(
        takeUntil(this.unsub),
        switchMap(() => this.getCurrentTrack())
      )
      .subscribe();

    return;
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.unsubscribe();
  }

  public formatFunction(value: number) {
    return `${value}%`;
  }

  public onVolumeChange($event: any) {
    this.spotifyService
      .setVolume($event.target.value)
      .pipe(first())
      .subscribe();
  }

  public nextTrack() {
    this.spotifyService.nextTrack().pipe(first()).subscribe();
  }

  public togglePlayback() {
    this.isPlaying
      ? this.spotifyService.pausePlayback().pipe(first()).subscribe()
      : this.spotifyService.startPlayback().pipe(first()).subscribe();
  }

  public previousTrack() {
    this.spotifyService.previousTrack().pipe(first()).subscribe();
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
