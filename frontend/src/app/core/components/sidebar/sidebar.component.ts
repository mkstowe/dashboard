import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { HassService } from 'src/app/home-assistant/services/hass.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatExpansionPanel) deviceList: MatExpansionPanel;
  public date: Date = new Date();
  public activeDevices: any;
  public numActiveDevices: number;
  public weather: string;
  public activeDeviceString: string;

  private lightList = [
    'light.office',
    'light.living_room',
    'light.bedroom',
    'light.dimmer',
    'switch.plug_1',
  ];

  private speakerList = [
    'media_player.bathroom_speaker',
    'media_player.living_room_speaker',
    'media_player.kitchen_display',
    'media_player.bedroom_speaker',
  ];

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities.subscribe({
      next: (result) => {
        const weatherTemp =
          result['sensor.pirateweather_temperature']?.state.split('.')[0];
        const weatherSummary = result['sensor.pirateweather_summary']?.state;
        this.weather = `${weatherTemp}° and ${weatherSummary}`;

        const activeLights = Object.keys(result)
          .filter((e) => this.lightList.includes(e) && result[e].state === 'on')
          .map((l) => result[l].attributes.friendly_name);
        const activeSpeakers = Object.keys(result)
          .filter(
            (e) =>
              this.speakerList.includes(e) &&
              (result[e].state === 'on' || result[e].state === 'playing')
          )
          .map((s) => result[s].attributes.friendly_name);
        this.activeDevices = [...activeLights, ...activeSpeakers];
        this.numActiveDevices = this.activeDevices.length;

        if (this.numActiveDevices > 1 || this.numActiveDevices === 0) {
          this.activeDeviceString = `${this.numActiveDevices} devices are on`;
        } else {
          this.activeDeviceString = `${this.activeDevices[0]} is on`;
        }

        if (this.numActiveDevices < 2) {
          this.deviceList?.close();
        }
      },
    });

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
