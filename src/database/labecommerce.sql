-- Active: 1673972772394@@127.0.0.1@3306
-- criar tabela de usuarios
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL);

-- popular com pelo menos 3 usuarios
INSERT INTO users(id, email, password)
VALUES ("Maria", "maria@gmail.com", "maria123"), 
("Veronica", "veronica@gmail.com", "veronica123"), 
("Bruno", "bruno@gmail.com", "bruno123");

-- criar tabela de produtos
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price INTEGER NOT NULL,
    category TEXT NOT NULL);

-- popular tabela com 5 produtos
INSERT INTO products(id, name, price, category)
VALUES ("01", "Condicionador", 20, "Higiene Pessoal"),
("02", "Shampoo", 22, "Higiene Pessoal"),
("03", "Creme", 30, "Cosmético"),
("04", "Perfume", 100, "Cosmético"),
("05", "Desodorante", 14, "Higiene Pessoal");


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

--------------------------------------------------------------------------
-- exercicios relacoes sql
    -- exercicio 1
-- criar tabela de pedidos
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL, -- usar 1 para true e 0 para false
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

    -- exercicio 2
-- criar dois pedidos para cada usuario cadastrado
INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES ("p001", 50, 1, null, "Maria"),
("p002", 30, 0, null, "Maria"),
("p003", 80, 1, null, "Bruno"),
("p004", 100, 0, null, "Bruno");

-- editar status de um pedido para entregue na hora atual
UPDATE purchases
SET delivered_at = DATETIME('now', 'localtime')
WHERE id = "p002";

    -- exercicio 3
-- criar query de consulta de compras de um usuario, usando id do comprador
SELECT * FROM purchases
WHERE buyer_id = "Maria";

---------------------------------------------------------------------------------------
--- relacoes sql 2
    --ex 1
-- criar tabela de relacao purchases_products
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("p002", "04", 3),
    ("p004", "02", 1),
    ("p003", "01", 7);

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

