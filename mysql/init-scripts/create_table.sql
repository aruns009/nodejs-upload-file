CREATE TABLE IF NOT EXISTS pictures (
    id int NOT NULL AUTO_INCREMENT,
    picture_name varchar(25),
    picture_url varchar(500),
    uploaded_datetime  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);