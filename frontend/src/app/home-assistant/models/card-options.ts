import { ServiceCall } from './service-call';
import { StateOptions } from './state-options';

export interface CardOptions {
  entityId: string;
  icon?: string;
  iconActive?: string;
  lock?: boolean;
  name?: string;
  service?: ServiceCall;
  state?: string;
  stateOptions?: StateOptions;
}
