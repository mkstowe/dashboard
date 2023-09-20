import { Component, OnInit } from '@angular/core';
import { translateTransition } from './routing-transitions';
import { RouterOutlet } from '@angular/router';
import { SpotifyService } from './music/services/spotify.service';
// import { AuthService } from '@auth0/auth0-angular';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [translateTransition],
})
export class AppComponent implements OnInit {
  public sidebarActive = false;
  public loggedIn: boolean;

  constructor(private spotifyService: SpotifyService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.loggedIn = res;
    })
  }

  public closeSidebar() {
    this.sidebarActive = false;
  }

  public prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary';
      return tab;
    }
  }

  public toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
}
