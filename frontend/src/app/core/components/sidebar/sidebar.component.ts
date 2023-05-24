import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { HassEntities } from 'home-assistant-js-websocket';
import { Subject, takeUntil } from 'rxjs';
import { HassService } from 'src/app/home-assistant/services/hass.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel) deviceList: MatExpansionPanel;
  public date: Date = new Date();
  public activeDevices: string[];
  public numActiveDevices: number;
  public weather: string;
  public activeDeviceString: string;

  private notifier$ = new Subject<void>();

  private devices = [
    'light.office',
    'light.living_room',
    'light.bedroom',
    'light.loft_lights',
    'light.candle_lamp',
    'media_player.bathroom_speaker',
    'media_player.living_room_speaker',
    'media_player.kitchen_display',
    'media_player.bedroom_speaker',
    'fan.office_fan',
    'remote.living_room_tv',
  ];

  private activeStates = ['on', 'playing'];

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (res) => {
        this.updateSidebarContent(res);
      },
    });

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public trackDevice(index: number, device: any) {
    return device.id;
  }

  private updateSidebarContent(entities: HassEntities) {
    const weatherTemp =
      entities['sensor.pirateweather_temperature']?.state.split('.')[0];
    const weatherSummary = entities['sensor.pirateweather_summary']?.state;
    this.weather = `${weatherTemp}° and ${weatherSummary}`;

    this.activeDevices = Object.keys(entities)
      .filter(
        (e) =>
          this.devices.includes(e) &&
          this.activeStates.includes(entities[e].state)
      )
      .map((l) => entities[l].attributes.friendly_name!);

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
