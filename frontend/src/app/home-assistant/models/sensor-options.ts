import { StateOptions } from './state-options';

export interface SensorOptions {
  entityId: string;
  icon?: string;
  name?: string;
  state?: string;
  stateOptions?: StateOptions;
  enableGraph?: boolean;
}
