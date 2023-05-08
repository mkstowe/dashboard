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
