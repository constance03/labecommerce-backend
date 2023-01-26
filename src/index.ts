//além de importar o express, também precisamos importar os objetos Request e Response
import express, { Request, Response } from "express";
// importar cors
import cors from "cors";
// importar a connection
import { db } from "./database/knex";
import { TProduct, TPurchase, TUser } from "./type";

// instalar express
// npm install express
// npm install @types/express -D

// instalar cors
// npm install cors
// npm install @types/cors -D

// instalar ts-node-dev
//npm install ts-node-dev -D

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

//================================================================================================
// install knex e types
// npm install knex sqlite3
// npm install -D @types/knex
// criar arquivo knex.ts

//USERS
//getAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send({ usuarios: result });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createUser
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (typeof id != "string" || id.length < 4) {
      res.status(400);
      throw new Error("'id' invalido, precisa ter no mínimo 4 caracteres e ser uma string");
    }

    if (typeof name != "string" || name.length < 1) {
        res.status(400);
        throw new Error("'name' invalido, precisa ter no mínimo 1 caractere e ser uma string");
      }

    if (typeof email != "string" || email.length < 1) {
      res.status(400);
      throw new Error("'email' invalido, precisa ter no mínimo 1 caractere e ser uma string");
    }

    if (typeof password != "string" || password.length < 1) {
      res.status(400);
      throw new Error("'password' invalido, deve ter no mínimo 1 caractere e ser uma string");
    }

    const [userIdAlreadyExists]: TUser[] | undefined[] = await db("users").where({id})
        
        if (userIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' do usuário já existe")
        }

    const newUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

    res.status(201).send(`Cadastrado realizado com sucesso`);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//deleteUserById
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [user]: TUser[] | undefined[] = await db("users").where({id: idToDelete})
        
        if (!user) {
            res.status(400)
            throw new Error("'id' do usuário não encontrada")
        }

        await db("users").del().where({id: idToDelete})

        res.status(200).send({message: "Usuário deletado com sucesso"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



//PRODUCTS
//getAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send({ produtos: result });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//searchProductByName
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const result = await db("products").where("name", "LIKE", `%${q}%`);

    if (q.length < 1) {
      res.status(404);
      throw new Error("O parâmetro de busca deve ter pelo menos um caractere");
    }

    res.status(200).send({ produto: result });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createProduct
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    if (typeof id != "string" || id.length < 7) {
        res.status(400);
        throw new Error("'id' invalido, precisa ter no mínimo 7 caracteres e ser uma string");
      }
  
    if (typeof name != "string" || name.length < 1) {
        res.status(400);
        throw new Error("'name' invalido, precisa ter no mínimo 1 caractere e ser uma string");
    }

    if (typeof price != "number" || price < 1 ) {
      res.status(400);
      throw new Error("'price' invalido, precisa ser um number maior ou igual a 1");
    }

    if (typeof description != "string" || description.length < 1) {
      res.status(400);
      throw new Error("'description' invalido, deve ser uma string e ter pelo menos 1 caractere");
    }

    if (typeof imageUrl != "string" || imageUrl.length < 1) {
        res.status(400);
        throw new Error("'imageUrl' invalido, deve ser uma string e ter pelo menos 1 caractere");
      }

  
      const [productIdAlreadyExists]: TProduct[] | undefined[] = await db("products").where({id})
          
          if (productIdAlreadyExists) {
              res.status(400)
              throw new Error("'id' do produto já existe")
          }
  
    const newProduct = {
      id,
      name,
      price,
      description,
      image_url: imageUrl
    };

    await db("products").insert(newProduct);

    res.status(201).send(`Produto cadastrado com sucesso`);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//editProductById
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.image_url


        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (newId.length < 7) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 7 caracteres")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }

            if (newName.length < 2) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 2 caracteres")
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' deve ser um number")
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
            }
        }

        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser string")
            }
        }

        const [ product ]: TProduct[] | undefined[]= await db("products").where({id: idToEdit})

        if (!product) {
            res.status(404)
            throw new Error ("'id' do produto não encontrada")
        }
        
        const updatedProduct: TProduct = { 
            id: newId || product.id,
            name: newName || product.name,
            price: isNaN(newPrice) ? product.price : newPrice,
            description: newDescription || product.description,
            image_url: newImageUrl || product.image_url
        }
    
        await db("products").update(updatedProduct).where({ id: idToEdit })
  

        res.status(200).send({ message: "Atualização do produto realizada com sucesso" })
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//deleteProductById
app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [product]: TProduct[] | undefined[] = await db("products").where({id: idToDelete})
        
        if (!product) {
            res.status(400)
            throw new Error("'id' do produto não encontrada")
        }

        await db("products").del().where({id: idToDelete})

        res.status(200).send({message: "Produto deletado com sucesso"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



// PURCHASES
//getAllPurchases
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db("purchases");
    res.status(200).send({ compras: result });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createPurchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, totalPrice, createdAt, paid } = req.body;

    if (typeof id != "string" || id.length < 6) {
        res.status(400);
        throw new Error("'id' invalido, precisa ter no mínimo 6 caracteres e ser uma string");
      }
  
    if (typeof buyer != "string" || buyer.length < 4) {
        res.status(400);
        throw new Error("'buyer' invalido, precisa ter no mínimo 4 caracteres e ser uma string");
    }

    if (typeof totalPrice != "number" || totalPrice < 1 ) {
      res.status(400);
      throw new Error("'totalPrice' invalido, precisa ser um number maior ou igual a 1");
    }

    if (typeof createdAt != "string" || createdAt.length < 1) {
      res.status(400);
      throw new Error("'createdAt' invalido, deve ser uma string e ter pelo menos 1 caractere");
    }

    if (typeof paid != "number") {
        res.status(400);
        throw new Error("'paid' invalido, deve ser um number e ser igual a 1 (pago) ou (0) não pago");
      }

  
      const [purchaseIdAlreadyExists]: TPurchase[] | undefined[] = await db("purchases").where({id})
          
          if (purchaseIdAlreadyExists) {
              res.status(400)
              throw new Error("'id' da compra já existe")
          }

        const newPurchase = {
        id,
        buyer,
        total_price: totalPrice,
        paid,
        created_at: createdAt
        };

    await db("purchases").insert(newPurchase);

    res.status(201).send(`Compra cadastrada com sucesso`);

  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//getPurchaseById
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;
    const boughtProducts = await db
      .select("purchases_products.product_id", "products.*")
      .from("purchases_products")
      .leftJoin("products", "purchases_products.product_id", "products.id")
      .where({ "purchase_id": purchaseId });

    const userPurchase = await db
      .select("purchases.*", "users.id", "users.name", "users.email")
      .from("purchases")
      .leftJoin("users", "purchases.buyer", "users.id")
      .where({ "purchases.id": purchaseId });

    res.status(200).send({ compra: userPurchase, produtos: boughtProducts });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//getUserPurchasesByUserId
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
  
      const result = await db("purchases").where({ buyer: userId });
  
      res.status(200).send({ compras: result });
    } catch (error) {
      console.log(error);
  
      if (req.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });
  
//deletePurchaseById
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({id: idToDelete})
        
        if (!purchase) {
            res.status(400)
            throw new Error("'id' da compra não encontrada")
        }

        await db("purchases").del().where({id: idToDelete})

        res.status(200).send({message: "Compra deletada com sucesso"})

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
