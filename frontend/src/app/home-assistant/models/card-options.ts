import { ServiceCall } from './service-call';
import { StateOptions } from './state-options';

export interface CardOptions {
  entityId: string;
  name?: string;
  state?: string;
  icon?: string;
  iconActive?: string;
  lock?: boolean;
  service?: ServiceCall;
  stateOptions?: StateOptions;
}
