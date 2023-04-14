import { Component } from '@angular/core';
import { CardGroup } from 'src/app/shared/core.models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public data: CardGroup[] = [
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
            },
            {
              entityId: 'sensor.broadlink_humidity',
              icon: 'water-drops',
              name: 'Humidity',
              stateOptions: {
                round: true,
                afterString: '%',
              },
            },
          ],
        },
      ],
    },
    {
      title: 'Lights',
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
          type: 'entityCard',
          cardOptions: {
            entityId: 'switch.plug_1',
            icon: 'candle',
            iconActive: 'candle-active',
            service: {
              type: 'call_service',
              domain: 'switch',
              service: 'toggle',
              target: {
                entity_id: 'switch.plug_1',
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
              },
            },
            {
              entityId: 'sensor.litter_robot_waste_drawer',
              icon: 'poop',
              name: 'Waste Level',
              stateOptions: {
                round: true,
                afterString: '%'
              }
            }
          ],
        },
        {
          type: 'sensorGroup',
          sensors: [
            {
              entityId: 'sensor.food_level',
              icon: 'chicken-leg',
              name: 'Food Level'
            }
          ]
        }
      ],
    },
  ];
}
