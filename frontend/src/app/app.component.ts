import { Component, OnInit } from '@angular/core';
import { translateTransition } from './routing-transitions';
import { ChildrenOutletContexts } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.loggedIn = res;
    });
  }

  public closeSidebar() {
    this.sidebarActive = false;
  }

  public prepareRoute() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['tab'];
  }

  public toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
}
