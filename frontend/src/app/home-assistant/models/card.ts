import { CardOptions } from './card-options';
import { SensorOptions } from './sensor-options';

export interface Card {
  id: number;
  type: string;
  cardOptions?: CardOptions;
  sensors?: SensorOptions[];
}
