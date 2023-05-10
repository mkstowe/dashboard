import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss'],
})
export class MusicPageComponent implements OnInit {
  public apiUrl = environment.apiUrl;

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

  public getProfileInfo() {
    this.spotifyService.getMyProfile().subscribe();
  }

  public getPlaylist(id: string) {
    this.spotifyService.getPlaylist(id).subscribe();
  }

  public getPlaylists() {
    this.spotifyService.getMyPlaylists().subscribe();
  }

  public transferPlayback(deviceIds: string[], play?: boolean) {
    this.spotifyService.transferPlayback(deviceIds, { play }).subscribe();
  }

  public getAvailableDevices() {
    this.spotifyService.getAvailableDevices().subscribe();
  }

  public startPlayback(deviceId: string) {
    this.spotifyService.startPlayback({ deviceId }).subscribe();
  }

  public pausePlayback(deviceId: string) {
    this.spotifyService.pausePlayback({ deviceId }).subscribe();
  }

  public nextTrack(deviceId: string) {
    this.spotifyService.nextTrack({ deviceId }).subscribe();
  }

  public previousTrack(deviceId: string) {
    this.spotifyService.previousTrack({ deviceId }).subscribe();
  }

  public seekToPosition(position: number, deviceId?: string) {
    this.spotifyService.seekToPosition(position, { deviceId }).subscribe();
  }
}
