CREATE TABLE task(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(15) NOT NULL,
    dataCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endData TIMESTAMP
);