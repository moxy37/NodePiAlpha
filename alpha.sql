CREATE TABLE CowLog (
    cowId VARCHAR(36) NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    temp FLOAT,
    timestamp DATETIME DEFAULT NOW()
);

