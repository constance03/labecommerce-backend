-- Active: 1673972772394@@127.0.0.1@3306
-- criar tabela de usuarios
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL);

-- popular com pelo menos 3 usuarios
INSERT INTO users(id, email, password)
VALUES ("Maria", "maria@gmail.com", "maria123");

INSERT INTO users(id, email, password)
VALUES ("Veronica", "veronica@gmail.com", "veronica123");

INSERT INTO users(id, email, password)
VALUES ("Bruno", "bruno@gmail.com", "bruno123");


-- criar tabela de produtos
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price INTEGER NOT NULL,
    category TEXT NOT NULL);

-- popular tabela com 5 produtos
INSERT INTO products(id, name, price, category)
VALUES ("01", "Condicionador", 20, "Higiene Pessoal");

INSERT INTO products(id, name, price, category)
VALUES ("02", "Shampoo", 22, "Higiene Pessoal");

INSERT INTO products(id, name, price, category)
VALUES ("03", "Creme", 30, "Cosmético");

INSERT INTO products(id, name, price, category)
VALUES ("04", "Perfume", 100, "Cosmético");

INSERT INTO products(id, name, price, category)
VALUES ("05", "Desodorante", 14, "Higiene Pessoal");


-- aprofundamento sql
    -- exercicio 1
-- get all users
SELECT * FROM users;

-- get all products
SELECT * FROM products;

-- search product by name
SELECT * FROM products
WHERE name LIKE "%shampoo%";

-- create new product
INSERT INTO products(id, name, price, category)
VALUES ("06", "Sabonete", 4, "Higiene Pessoal");

-- create new user
INSERT INTO users(id, email, password)
VALUES ("Matheus", "matheus@gmail.com", "matheus123");

    -- exercicio 2
-- get product by id
SELECT * FROM products
WHERE id = "01";

-- delete product by id
DELETE FROM users
WHERE id = "Matheus";

-- delete product by id
DELETE FROM products
WHERE id = "06";

-- edit user by id
UPDATE users
SET email = "veronica0@gmail.com"
WHERE id = "veronica";

-- edit product by id
UPDATE products
SET price = 27
WHERE id = "03";

    --exercicio 3
-- get all users
SELECT * FROM users
ORDER BY email ASC;

-- get all products versao 1
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- get all products versao 2
SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;