import { SensorOptions } from './sensor-options';
import { ServiceCall } from './service-call';
import { StateOptions } from './state-options';

export interface Card {
  id: number;
  group: number | string;
  type: string;
  entityId: string;
  icon?: string;
  iconActive?: string;
  lock?: boolean;
  name?: string;
  service?: ServiceCall | string;
  state?: string;
  stateOptions?: StateOptions | string;
  sensors?: SensorOptions[];
}
