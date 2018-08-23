CREATE TABLE CowLog (
    cowId VARCHAR(36) NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    temp1 FLOAT,
    temp2 FLOAT,
    rssi FLOAT,
    timestamp DATETIME DEFAULT NOW(),
    notes VARCHAR(255)
);

