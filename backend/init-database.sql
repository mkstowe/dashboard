CREATE TABLE IF NOT EXISTS hassGroup (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS hassCard (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  'group' INTEGER NOT NULL,
  entityId TEXT NOT NULL,
  icon TEXT,
  iconActive TEXT,
  lock BOOLEAN,
  name TEXT,
  state TEXT,
  service TEXT,
  stateOptions TEXT,
  FOREIGN KEY ('group')
  REFERENCES hassGroup (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS plant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    scientificName TEXT,
    type TEXT,
    dateAdded TEXT,
    temperature TEXT,
    humidity TEXT,
    isToxic INTEGER,
    light TEXT,
    water TEXT,
    soil TEXT,
    fertilizer TEXT,
    propagation TEXT,
    repotting TEXT,
    lastWatered TEXT,
    lastFertilized TEXT,
    notes TEXT
);
