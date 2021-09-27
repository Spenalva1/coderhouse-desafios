CREATE DATABASE ecommerce;

use ecommerce;

create table product (
	title VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(500) NOT NULL,
    price FLOAT NOT NULL,
    _id INT NOT NULL auto_increment,
    PRIMARY KEY(_id)
);

create table author (
	email VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    alias VARCHAR(50) NOT NULL,
    age int NOT NULL,
    avatar VARCHAR(500) NOT NULL,
    _id INT NOT NULL auto_increment,
    PRIMARY KEY(_id)
);

create table message (
    message VARCHAR(500) NOT NULL,
    date VARCHAR(50) NOT NULL,
    author int NOT NULL,
    _id INT NOT NULL auto_increment,
    PRIMARY KEY(_id),
    FOREIGN KEY(author) REFERENCES author(_id)
);