export interface CardGroup {
  title: string;
  cards: Card[];
}

export interface Card {
  type: string;
  cardOptions?: CardOptions;
  sensors?: SensorOptions[];
}

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
export interface ServiceCall {
  type?: string;
  domain?: string;
  service: string;
  service_data?: any;
  target: {
    entity_id?: string;
    area_id?: string;
    device_id?: string;
  };
}

export interface SensorOptions {
  entityId: string;
  icon?: string;
  name?: string;
  state?: string;
  stateOptions?: StateOptions;
  enableGraph?: boolean;
}

export interface StateOptions {
  round?: boolean;
  beforeString?: string;
  afterString?: string;
  warningExpression?: string;
  dangerExpression?: string;
}
