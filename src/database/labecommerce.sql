-- Active: 1674739978297@@127.0.0.1@3306
-- criar tabela de usuarios
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME()));

-- popular com pelo menos 3 usuarios
INSERT INTO users(id, name, email, password)
VALUES ("u001", "Maria", "maria@gmail.com", "maria123"), 
("u002", "Veronica", "veronica@gmail.com", "veronica123"), 
("u003", "Bruno", "bruno@gmail.com", "bruno123");

-- criar tabela de produtos
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL);

-- popular tabela com 5 produtos
INSERT INTO products(id, name, price, description, image_url)
VALUES ("prod001", "Chocolate branco", 7, "Chocolate branco artesanal, 200g.", "https://www.gobeche.com.br/assets/uploads/loja/tabletes-chocolate-branco-ao-leite-de-coco-gobeche-sem-acucar-e-sem-adocante-szka2-20210825191211.png"),
("prod002", "Chocolate ao leite", 8, "Chocolate ao leite artesanal, 200g.", "https://www.gobeche.com.br/assets/uploads/loja/tabletes-chocolate-ao-leite-de-coco-gobeche-adocado-com-maltitol-9k1if-20210825204121.png"),
("prod003", "Chocolate ao leite - Nozes", 10, "Chocolate ao leite com pedaços de nozes, 200g.", "https://www.prawer.com.br/media/catalog/product/cache/31cbea770b7e97ca801b494aea07236b/b/a/barra_ao_leite_com_nozes_.png"),
("prod004", "Gummy bears", 6, "Pacote de balas de goma em formato de urso, 300g.", "https://images.squarespace-cdn.com/content/v1/5ea0e3a93688fa46d178c5f6/1589924090365-XSO3XKK1BUIP95AJ44G3/GummyBears14_3_Pile.png?format=1000w"),
("prod005", "Pirulitos sortidos", 20, "Pacote de pirulitos com sabores sortidos: uva, laranja, abacaxi e limão, 500g.", "https://frutmel.com.br/uploads/produtos/2693131f2fd57bbcf1a73a71f088d43a.png");

-- criar tabela de pedidos
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL, -- usar 1 para true e 0 para false
    FOREIGN KEY (buyer) REFERENCES users (id)
);

-- criar dois pedidos para cada usuario cadastrado
INSERT INTO purchases (id, buyer, total_price)
VALUES ("pur001", "u001", 16),
("pur002", "u002", 21),
("pur003", "u003", 10),
("pur004", "u004", 6);

-- criar tabela de relacao purchases_products
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("pur001", "prod002", 2),
    ("pur002", "prod001", 3),
    ("pur003", "prod003", 1),
    ("pur004", "prod004", 1);


-- get all users
SELECT * FROM users;

-- get all products
SELECT * FROM products;

-- get all purchases
SELECT * FROM purchases;

-- get products in purchases
SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


-- =========================================================================================================================
    -- procurar, adicionar, deletar e editar tabelas/itens usando o banco de dados

-- search product by name
SELECT * FROM products
WHERE name LIKE "%chocolate%";

-- create new product
INSERT INTO products(id, name, price, description, image_url)
VALUES ("prod006", "Balas sortidas", 15, "Pacote de balas com sabores sortidos: uva, laranja, abacaxi e limão, 250g.", "https://frutmel.com.br/uploads/produtos/8511b87778413df41b8ba6a2950e6781.png");

-- create new user
INSERT INTO users(id, name, email, password)
VALUES ("u004", "Matheus", "matheus@gmail.com", "matheus123");

-- get product by id
SELECT * FROM products
WHERE id = "prod003";

-- delete user by id
DELETE FROM users
WHERE id = "u002";

-- delete product by id
DELETE FROM products
WHERE id = "prod006";

-- edit user by id
UPDATE users
SET email = "veronica.rubim0@gmail.com"
WHERE id = "u002";

-- edit product by id
UPDATE products
SET price = 10
WHERE id = "prod006";

-- get all users from email
SELECT * FROM users
ORDER BY email ASC;

-- get all products - versao 1
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- get all products - versao 2
SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;

-- editar status de um pedido para entregue na hora atual
UPDATE purchases
SET delivered_at = DATETIME('now', 'localtime')
WHERE id = "pur002";

-- criar query de consulta de compras de um usuario, usando id do comprador
SELECT * FROM purchases
WHERE buyer_id = "u002";