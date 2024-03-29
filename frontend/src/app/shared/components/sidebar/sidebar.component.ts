import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService as auth } from 'src/app/core/services/auth.service';
import { HassEntities } from 'home-assistant-js-websocket';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { HassService } from 'src/app/home-assistant/services/hass.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel) public deviceList: MatExpansionPanel;

  public activeDeviceString: string;
  public activeDevices: string[] = [];
  public date: Date = new Date();
  public numActiveDevices: number;
  public weather: string;
  public isDemo: boolean;
  public isDemo$: any;

  private entities: HassEntities;
  private activeStates = ['on', 'playing'];
  private sidebarEntities: any[] = [];
  private notifier$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    private auth: auth,
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) public document: Document
  ) {}

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.hassService.refetch
      .pipe(switchMap(() => this.hassService.getSidebarEntities()))
      .subscribe((res: any) => {
        this.sidebarEntities = res;
        this.updateSidebarContent();
      });

    this.hassService.entities
      .pipe(takeUntil(this.notifier$))
      .subscribe((res) => {
        this.entities = res;
        this.updateSidebarContent();
      });

    this.isDemo$ = this.auth.isDemo$;

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  public trackDevice(index: number, device: any) {
    return device.id;
  }

  public routeTo(route: string) {
    this.router.navigate([route], {
      relativeTo: this.activatedRoute,
    });
  }

  private updateSidebarContent() {
    const weatherStrings = new Map<string, string>([
      ['clear-night', 'clear'],
      ['cloudy', 'cloudy'],
      ['fog', 'foggy'],
      ['hail', 'hail'],
      ['lightning', 'storms'],
      ['lightning-rainy', 'storms'],
      ['partlycloudy', 'partly cloudy'],
      ['pouring', 'pouring rain'],
      ['rainy', 'rain'],
      ['snowy', 'snow'],
      ['snowy-rainy', 'sleet'],
      ['sunny', 'sunny'],
      ['windy', 'windy'],
      ['windy-variant', 'windy'],
      ['exceptional', 'clear'],
    ]);

    const weatherTemp =
      this.entities['weather.forecast_home']?.attributes.temperature;
    const weatherState = this.entities['weather.forecast_home']?.state;
    const weatherSummary = weatherStrings.get(weatherState) || weatherState;
    this.weather = `${weatherTemp}° and ${weatherSummary}`;

    this.activeDevices = [];
    Object.keys(this.entities).forEach((e) => {
      this.sidebarEntities.forEach((s) => {
        if (
          s.entityId == e &&
          this.activeStates.includes(this.entities[e].state)
        ) {
          this.activeDevices.push(
            s.name || this.entities[e].attributes.friendly_name!
          );
        }
      });
    });

    this.numActiveDevices = this.activeDevices.length;

    if (this.numActiveDevices > 1 || this.numActiveDevices === 0) {
      this.activeDeviceString = `${this.numActiveDevices} devices are on`;
    } else {
      this.activeDeviceString = `${this.activeDevices[0]} is on`;
    }

    if (this.numActiveDevices < 2) {
      this.deviceList?.close();
    }
  }
}
