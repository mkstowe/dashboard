export interface Plant {
  id: number;
  name?: string;
  scientificName?: string;
  type?: string;
  dateAdded?: Date;
  temperature?: string;
  humidity?: string;
  isToxic?: boolean;
  light?: string;
  water?: string;
  soil?: string;
  fertilizer?: string;
  propagation?: string;
  repotting?: string;
  lastWatered?: Date;
  lastFertilized?: Date;
  notes?: string;
}
