import { CardOptions } from './card-options';
import { SensorOptions } from './sensor-options';

export interface Card {
  cardOptions?: CardOptions;
  sensors?: SensorOptions[];
  type: string;
}
