CREATE DATABASE yourDatabase;

USE yourDatabase;

CREATE TABLE cash_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coin25 INT DEFAULT 0,
    coin50 INT DEFAULT 0,
    coin1 INT DEFAULT 0,
    coin2 INT DEFAULT 0,
    coin5 INT DEFAULT 0,
    coin10 INT DEFAULT 0,
    cash20 INT DEFAULT 0,
    cash50 INT DEFAULT 0,
    cash100 INT DEFAULT 0,
    cash500 INT DEFAULT 0,
    cash1000 INT DEFAULT 0
);
