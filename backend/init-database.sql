CREATE TABLE IF NOT EXISTS plants (
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
