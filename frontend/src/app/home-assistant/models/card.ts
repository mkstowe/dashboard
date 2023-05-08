import { CardOptions } from './card-options';
import { SensorOptions } from './sensor-options';

export interface Card {
  type: string;
  cardOptions?: CardOptions;
  sensors?: SensorOptions[];
}
