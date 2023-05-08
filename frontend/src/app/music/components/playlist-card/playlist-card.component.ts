import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent implements OnInit {
  @Input() id: string;
  public playlist: any;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getPlaylist(this.id).subscribe((res: any) => {
      this.playlist = {
        name: res.name,
        image: res.images[0].url,
        context: res.uri,
      };
    });
  }

  public onClick() {
    this.spotifyService
      .startPlayback({ contextUri: this.playlist.context })
      .subscribe();
  }
}
