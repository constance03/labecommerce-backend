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
VALUES ("01", "Condicionador", "Higiene Pessoal");

INSERT INTO products(id, name, price, category)
VALUES ("02", "Shampoo", "Higiene Pessoal");

INSERT INTO products(id, name, price, category)
VALUES ("03", "Creme", "Cosmético");

INSERT INTO products(id, name, price, category)
VALUES ("04", "Perfume", "Cosmético");

INSERT INTO products(id, name, price, category)
VALUES ("05", "Desodorante", "Higiene Pessoal");