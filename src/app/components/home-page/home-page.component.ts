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
  ];
}
