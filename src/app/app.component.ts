import { Component } from '@angular/core';
import { translateTransition } from './shared/routing-transitions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [translateTransition],
})
export class AppComponent {
  public sidebarActive = false;

  prepareRoute(outlet: RouterOutlet) {
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
