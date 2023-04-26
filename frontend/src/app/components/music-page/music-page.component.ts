import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { CardGroup } from 'src/app/shared/core.models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss'],
})
export class MusicPageComponent implements OnInit {
  public apiUrl = environment.apiUrl;

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute, private router: Router) {}
  public data: CardGroup[] = [

  ];

  public access_token: string | null;

  ngOnInit(): void {
    this.access_token = this.spotifyService.getAccessToken();
    return;
  }

}
