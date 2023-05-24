import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpotifyService } from '../../services/spotify.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss'],
})
export class MusicPageComponent implements OnInit, OnDestroy {
  public apiUrl = environment.apiUrl;
  private notifier$ = new Subject<void>();

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public access_token: string | null;
  public playlists = [
    '4vNldb5p8tQ9RmX7XSaTIM',
    '0P9fhX6DxKRemFppitUO40',
    '3vMB7rfIss8XpqjrJqGE4D',
    '3sc1x7K65uAAikfznMD8sd',
    '0tgz34iRZ1VLeMVtHx0Od9',
    '7oROe52RFDdNFrInhWSXMd',
    '7tDigJ9KogRDHhl8k804So',
    '6g0GoROlTNHnPtEWmmV3uw',
    '7KrR37m0IMyREptGTQLU6W',
    '4fg2H1M5YfQ7hP4Jswstdb',
    '3tT78lDIRF5kjOuilwihr4',
    '37i9dQZEVXcBLmltz3RQwu',
  ];

  ngOnInit(): void {
    this.access_token = this.spotifyService.getAccessToken();
    return;
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public getProfileInfo() {
    this.spotifyService.getMyProfile().pipe(takeUntil(this.notifier$)).subscribe();
  }

  public getPlaylist(id: string) {
    this.spotifyService.getPlaylist(id).pipe(takeUntil(this.notifier$)).subscribe();
  }

  public getPlaylists() {
    this.spotifyService.getMyPlaylists().subscribe();
  }

  public transferPlayback(deviceIds: string[], play?: boolean) {
    this.spotifyService.transferPlayback(deviceIds, { play }).pipe(takeUntil(this.notifier$)).subscribe();
  }

  public getAvailableDevices() {
    this.spotifyService
      .getAvailableDevices()
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }

  public startPlayback(deviceId: string) {
    this.spotifyService
      .startPlayback({ deviceId })
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }

  public pausePlayback(deviceId: string) {
    this.spotifyService
      .pausePlayback({ deviceId })
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }

  public nextTrack(deviceId: string) {
    this.spotifyService
      .nextTrack({ deviceId })
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }

  public previousTrack(deviceId: string) {
    this.spotifyService
      .previousTrack({ deviceId })
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }

  public seekToPosition(position: number, deviceId?: string) {
    this.spotifyService
      .seekToPosition(position, { deviceId })
      .pipe(takeUntil(this.notifier$))
      .subscribe();
  }
}
