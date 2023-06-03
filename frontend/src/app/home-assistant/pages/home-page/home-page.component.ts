import { Component } from '@angular/core';
import { CardGroup } from '../../models/card-group';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public data: CardGroup[] = [
    {
      title: 'Quick Toggles',
      cards: [
        {
          type: 'entityCard',
          cardOptions: {
            entityId: 'script.sleepy_time',
            icon: 'zzz',
            name: 'Sleepy Time',
            state: ' ',
            lock: true,
            service: {
              type: 'call_service',
              domain: 'script',
              service: 'turn_on',
              target: {
                entity_id: 'script.sleepy_time',
              },
            },
          },
        },
        {
          type: 'entityCard',
          cardOptions: {
            entityId: 'input_boolean.air_conditioner_toggle',
            icon: 'fan',
            iconActive: 'fan-active',
            service: {
              type: 'call_service',
              domain: 'input_boolean',
              service: 'toggle',
              target: {
                entity_id: 'input_boolean.air_conditioner_toggle'
              }
            }
          }
        }
      ],
    },
    {
      title: 'Overview',
      cards: [
        {
          type: 'sensorGroup',
          sensors: [
            {
              entityId: 'sensor.broadlink_temperature',
              icon: 'thermometer',
              name: 'Temperature',
              stateOptions: {
                round: true,
                afterString: '°',
              },
              enableGraph: true,
            },
            {
              entityId: 'sensor.broadlink_humidity',
              icon: 'water-drops',
              name: 'Humidity',
              stateOptions: {
                round: true,
                afterString: '%',
              },
              enableGraph: true,
            },
          ],
        },
        {
          type: 'sensorGroup',
          sensors: [
            {
              entityId: 'sensor.network_speeds',
              icon: 'speedometer',
              stateOptions: {
                round: true,
                afterString: ' Mbps',
              },
              enableGraph: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Office',
      cards: [
        {
          type: 'lightCard',
          cardOptions: {
            entityId: 'light.office',
            icon: 'floor-lamp',
            iconActive: 'floor-lamp-active',
            service: {
              type: 'call_service',
              domain: 'light',
              service: 'toggle',
              target: {
                entity_id: 'light.office',
              },
            },
          },
        },
        {
          type: 'fanCard',
          cardOptions: {
            entityId: 'fan.office_fan',
            icon: 'fan',
            iconActive: 'fan-active',
            service: {
              type: 'call_service',
              domain: 'fan',
              service: 'toggle',
              target: {
                entity_id: 'fan.office_fan',
              },
            },
          },
        },
        {
          type: 'entityCard',
          cardOptions: {
            entityId: 'script.desktop_sleep',
            icon: 'zzz',
            state: ' ',
            lock: true,
            service: {
              type: 'call_service',
              domain: 'script',
              service: 'turn_on',
              target: {
                entity_id: 'script.desktop_sleep',
              },
            },
          },
        },
      ],
    },
    {
      title: 'Bedroom',
      cards: [
        {
          type: 'lightCard',
          cardOptions: {
            entityId: 'light.bedroom',
            icon: 'table-lamp',
            iconActive: 'table-lamp-active',
            service: {
              type: 'call_service',
              domain: 'light',
              service: 'toggle',
              target: {
                entity_id: 'light.bedroom',
              },
            },
          },
        },
        {
          type: 'speakerCard',
          cardOptions: {
            entityId: 'media_player.bedroom_speaker',
            icon: 'speaker',
            iconActive: 'speaker-active',
            service: {
              type: 'call_service',
              domain: 'media_player',
              service: 'toggle',
              target: {
                entity_id: 'media_player.bedroom_speaker',
              },
            },
          },
        },
      ],
    },
    {
      title: 'Living Room',
      cards: [
        {
          type: 'lightCard',
          cardOptions: {
            entityId: 'light.living_room',
            icon: 'floor-lamp',
            iconActive: 'floor-lamp-active',
            service: {
              type: 'call_service',
              domain: 'light',
              service: 'toggle',
              target: {
                entity_id: 'light.living_room',
              },
            },
          },
        },
        {
          type: 'tvCard',
          cardOptions: {
            entityId: 'remote.living_room_tv',
            icon: 'tv',
            iconActive: 'tv-active',
            service: {
              type: 'call_service',
              domain: 'remote',
              service: 'toggle',
              target: {
                entity_id: 'remote.living_room_tv',
              },
            },
          },
        },
        {
          type: 'lightCard',
          cardOptions: {
            entityId: 'light.candle_lamp',
            icon: 'candle',
            iconActive: 'candle-active',
            service: {
              type: 'call_service',
              domain: 'light',
              service: 'toggle',
              target: {
                entity_id: 'light.candle_lamp',
              },
            },
          },
        },
        {
          type: 'lightCard',
          cardOptions: {
            entityId: 'light.loft_lights',
            icon: 'ceiling-light',
            iconActive: 'ceiling-light-active',
            service: {
              type: 'call_service',
              domain: 'light',
              service: 'toggle',
              target: {
                entity_id: 'light.loft_lights',
              },
            },
          },
        },
      ],
    },
    {
      title: 'Reading Nook',
      cards: [
        {
          type: 'lightCard',
          cardOptions: {
            entityId: 'light.reading_nook',
            icon: 'floor-lamp',
            iconActive: 'floor-lamp-active',
            service: {
              type: 'call_service',
              domain: 'light',
              service: 'toggle',
              target: {
                entity_id: 'light.reading_nook',
              },
            },
          },
        },
      ],
    },
    {
      title: 'Kitchen',
      cards: [
        {
          type: 'speakerCard',
          cardOptions: {
            entityId: 'media_player.kitchen_display',
            icon: 'speaker',
            iconActive: 'speaker-active',
            service: {
              type: 'call_service',
              domain: 'media_player',
              service: 'toggle',
              target: {
                entity_id: 'media_player.kitchen_display',
              },
            },
          },
        },
      ],
    },
    {
      title: 'Bathroom',
      cards: [
        {
          type: 'speakerCard',
          cardOptions: {
            entityId: 'media_player.bathroom_speaker',
            icon: 'speaker',
            iconActive: 'speaker-active',
            service: {
              type: 'call_service',
              domain: 'media_player',
              service: 'toggle',
              target: {
                entity_id: 'media_player.bathroom_speaker',
              },
            },
          },
        },
      ],
    },
    {
      title: 'Cats',
      cards: [
        {
          type: 'entityCard',
          cardOptions: {
            entityId: 'vacuum.litter_robot_litter_box',
            icon: 'toilet',
            name: 'Litter Robot',
            service: {
              type: 'call_service',
              domain: 'vacuum',
              service: 'start',
              target: {
                entity_id: 'vacuum.litter_robot_litter_box',
              },
            },
          },
        },
        {
          type: 'sensorGroup',
          sensors: [
            {
              entityId: 'sensor.litter_robot_litter_level',
              icon: 'litter',
              name: 'Litter Level',
              stateOptions: {
                round: true,
                afterString: '%',
                warningExpression: '<= 70',
                dangerExpression: '<= 40',
              },
              enableGraph: true,
            },
            {
              entityId: 'sensor.litter_robot_waste_drawer',
              icon: 'poop',
              name: 'Waste Level',
              stateOptions: {
                round: true,
                afterString: '%',
                warningExpression: '>= 50',
                dangerExpression: '>= 80',
              },
              enableGraph: true,
            },
          ],
        },
        {
          type: 'sensorGroup',
          sensors: [
            {
              entityId: 'sensor.food_level',
              icon: 'chicken-leg',
              name: 'Food Level',
              stateOptions: {
                dangerExpression: '=== "empty"',
              },
              enableGraph: false,
            },
          ],
        },
      ],
    },
  ];
  public sidebarActive = false;

  public toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
}
