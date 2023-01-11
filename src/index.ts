import { users, products, purchases } from "./database";
//além de importar o express, também precisamos importar os objetos Request e Response
import express, { Request, Response } from "express";
// importar cors
import cors from "cors";
import { ProductCategory } from "./type";

// exercicio 1
// instalar express
// npm install express
// npm install @types/express -D

// instalar cors
// npm install cors
// npm install @types/cors -D

//criação do servidor express
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre no formato json
app.use(express.json());

//configuração do middleware que habilita o CORS
app.use(cors());

//criar um get para teste
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// exercicio 2
// getAllUsers
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//getAllProducts
app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(products);
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
        
        res.send(error.message);
      }
    });

//getAllPurchases
app.get("/purchases", (req: Request, res: Response) => {
    try {
        res.status(200).send(purchases);
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
        
        res.send(error.message);
      }
});

//searchProductByName
app.get("/products/search", (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;
        const searchProduct = products.filter((product) =>
            product.name.toLowerCase().includes(q.toLowerCase())
        );

        if (q.length < 1) {
            res.status(404);
            throw new Error("O parâmetro de busca deve ter pelo menos um caractere");
        }

        res.status(200).send(searchProduct);

      } catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
});

// http://localhost:3003/products/search?q=creme

//exercicio 3
//createUser
app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;

        if (password.length < 1 || email.length < 1 || id.length < 1) {
            res.status(404);
            throw new Error("Por favor, preencha todos os campos (id, email e password)");
        }

        users.map((user) => {
            if (user.id === id) {
                res.status(404);
                throw new Error("Esse 'id' já existe. Por favor, tente novamente");
            } else if (user.email === email) {
                    res.status(404);
                    throw new Error("Esse 'email' já existe. Por favor, tente novamente");
                }
        })

        users.map((user) => {
            
        })
      
        const newUser = {
          id,
          email,
          password,
        };
      
        users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");

      } catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
});

//createProduct
app.post("/products", (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;

        if (category.length < 1 || name.length < 1 || price.length < 1 || id.length < 1) {
            res.status(404);
            throw new Error("Por favor, preencha todos os campos (id, name, price e category)");
        } else if (typeof price !== "number") {
            res.status(404);
            throw new Error("'price' deve ser um number");
        }

        products.map((product) => {
            if (product.id === id) {
                res.status(404);
                throw new Error("Esse 'id' de produto já existe. Por favor, tente novamente");
            }
        })
      
        const newProduct = {
            id,
            name,
            price,
            category,
        };

        products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");

      } catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
});

//createPurchase
app.post("/purchases", (req: Request, res: Response) => {

    try {
        const userId = req.body.userId as string;
        const productId = req.body.productId as string;
        const quantity = req.body.quantity as number;
        const totalPrice = req.body.totalPrice as number;

        if (totalPrice < 1 || productId.length < 1 || quantity < 1 || userId.length < 1) {
            res.status(404);
            throw new Error("Por favor, preencha todos os campos (userId, productId, quantity e totalPrice)");
        }

        const findUser = users.find((user) => user.id === userId)
               
        if (!findUser) {
            res.status(404);
            throw new Error("Esse 'userId' não existe. Por favor, tente novamente");
        }

        const findProduct = products.find((product) => product.id === productId)
                
        if (!findProduct) {
            res.status(404);
            throw new Error("Esse 'productId' não existe. Por favor, tente novamente");
        }

        if (totalPrice !== quantity*findProduct.price) {
            res.status(404);
            throw new Error("O valor total da compra não condiz com a quantity e o price do produto. Por favor, tente novamente");
        }
      
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice,
          };
        
          purchases.push(newPurchase);
          res.status(201).send("Compra realizada com sucesso");

      } catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
});

// -----------------------------------------------------------------------------------

//Aprofundamento express
// exercicio 1
//produtos por id
app.get("/products:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const productFound = products.find((product) => product.id === id);

    if (!productFound) {
      res.status(404);
      throw new Error("Produto não encontrado. Verifique a 'id'");
    }

    res.status(200).send(productFound);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//compras por id do usuario
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const purchaseFound = purchases.find(
            (purchase) => purchase.userId.toLowerCase() === id.toLowerCase()
        );
    
        if (!purchaseFound) {
          res.status(404);
          throw new Error("Produto não encontrado. Verifique a 'id'");
        }
    
        res.status(200).send(purchaseFound);
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }
});

// exercicio 2
//deletar usuario por id
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const indexToRemove = users.findIndex((user) => user.id === id);

        if (indexToRemove >= 0) {
          users.splice(indexToRemove, 1);
        } else {
            res.status(404);
            throw new Error("Usuário não encontrado. Verifique a 'id'");
        }
      
        res.status(200).send("User apagado com sucesso");
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }
});

//deletar produto por id
app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const indexToRemove = products.findIndex((product) => product.id === id);
      
        if (indexToRemove >= 0) {
          users.splice(indexToRemove, 1);
        } else {
            res.status(404);
            throw new Error("Produto não encontrado. Verifique a 'id'");
        }
      
        res.status(200).send("Produto apagado com sucesso");
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }

});

// exercicio 2
//editar usuario por id
app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const newId = req.body.id as string | undefined;
        const newEmail = req.body.email as string | undefined;
        const newPassword = req.body.password as string | undefined;

        if (newId !== undefined) {
            users.map((user) => {
                if (user.id === newId) {
                    res.status(404);
                    throw new Error("Esse 'id' já existe. Por favor, tente novamente");
                }
            })
        }

        if (newEmail !== undefined) {
            users.map((user) => {
                if (user.email === newEmail) {
                    res.status(404);
                    throw new Error("Esse 'email' já existe. Por favor, tente novamente");
                }
            })
        }
      
        const user = users.find((user) => user.id === id);
      
        if (user) {
          user.id = newId || user.id;
          user.email = newEmail || user.email;
          user.password = newPassword || user.password;
        } else { 
          res.status(404);
          throw new Error("Usuário não encontrado. Verifique a 'id'");
        }
      
        res.status(200).send("Cadastro atualizado com sucesso");
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }
});

//editar produto por id
app.put("/products/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id;

        const newId = req.body.id as string | undefined;
        const newName = req.body.name as string | undefined;
        const newPrice = req.body.price as number | undefined;
        const newCategory = req.body.category as ProductCategory | undefined;

        if (newId !== undefined) {
            users.map((user) => {
                if (user.id === id) {
                    res.status(404);
                    throw new Error("Esse 'id' já existe. Por favor, tente novamente");
                }
            })
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(404);
                throw new Error("'price' deve ser um number");
            }
        }

        const product = products.find((product) => product.id === id);
      
        if (product) {
          product.id = newId || product.id;
          product.name = newName || product.name;
          product.price = isNaN(newPrice) ? product.price : newPrice;
          product.category = newCategory || product.category;
        } else { 
          res.status(404);
          throw new Error("Produto não encontrado. Verifique a 'id'");
        }
      
        res.status(200).send("Produto atualizado com sucesso");
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }

});
