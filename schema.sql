CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
id INTEGER(10) AUTO_INCREMENT,
product_name VARCHAR(100),
depart_id INTEGER(10),
price decimal(9,2),
stock_quantity integer(10),
PRIMARY KEY (id)

);

INSERT INTO products values (1, "Socks", 1, 3.99, 10);
INSERT INTO products values (2, "T-shirts", 2, 10.99, 5);
INSERT INTO products values (3, "Hose", 3, 24.99, 5);
INSERT INTO products values (4, "Rake", 4, 12.99, 3);
INSERT INTO products values (5, "Jansport", 5, 40.99, 2);
INSERT INTO products values (6, "Notebook", 6, 1.99, 25);
INSERT INTO products values (7, "Printer", 7, 99.99, 1);
INSERT INTO products values (8, "Febreeze", 8, 3.99, 5);
INSERT INTO products values (9, "Shorts", 9, 24.99, 5);
INSERT INTO products values (10, "RAYBANS", 10, 49.99, 5);