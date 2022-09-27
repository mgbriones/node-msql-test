CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(45) DEFAULT NULL,
    PRIMARY KEY (id)


);

describe employee;

insert into employee value
    (1, 'Joe', 1000),
    (2, 'Henry', 340),
    (3, 'Mary', 4500),
    (4, 'Max', 9900);