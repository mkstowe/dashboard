import { Component } from '@angular/core';
import { translateTransition } from './routing-transitions';
import { RouterOutlet } from '@angular/router';
import { SpotifyService } from './music/services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [translateTransition],
})
export class AppComponent {
  public sidebarActive = false;

  // Instantiate service so we have spotify access on startup;
  private spotifyService: SpotifyService;

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
