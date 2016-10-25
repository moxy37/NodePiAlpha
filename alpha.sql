CREATE TABLE Gpio (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    pin INT DEFAULT 12,
    pinType INT DEFAULT 0,
    statusHigh VARCHAR(255),
    statusLow VARCHAR(255),
    statusData VARCHAR(255)
);

