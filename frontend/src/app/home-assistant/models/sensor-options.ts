import { StateOptions } from './state-options';

export interface SensorOptions {
  enableGraph?: boolean;
  entityId: string;
  icon?: string;
  name?: string;
  state?: string;
  stateOptions?: StateOptions;
}
