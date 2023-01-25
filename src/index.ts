//além de importar o express, também precisamos importar os objetos Request e Response
import express, { Request, Response } from "express";
// importar cors
import cors from "cors";
// importar a connection
import { db } from "./database/knex"
import { products } from "./database";

// exercicio 1
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

  //exercicio 1
//getAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {
      const result = await db("users")
      res.status(200).send({usuarios: result})
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

//getAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try {
      const result = await db.raw("products")
      res.status(200).send({produtos: result})
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

//getAllPurchases
app.get("/purchases", async (req: Request, res: Response) => {
  try {
      const result = await db("purchases")
      res.status(200).send({compras: result})
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

//searchProductByName
app.get("/products/search", async (req: Request, res: Response) => {
  try {
      const q = req.query.q as string;

      const result = await db("products").where("name", "LIKE", `%${q}%`)

        if (q.length < 1) {
            res.status(404);
            throw new Error("O parâmetro de busca deve ter pelo menos um caractere");
        }

      res.status(200).send({produto: result})
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

  //exercicio 2
//createUser
app.post("/users", async (req: Request, res: Response) => {
  try {
      const {id, email, password} = req.body
      
      if (typeof id != "string") {
          res.status(400)
          throw new Error("'id' invalido, deve ser uma string")
      }

      if (typeof email != "string") {
          res.status(400)
          throw new Error("'email' invalido, deve ser uma string")
      }

      if (typeof password != "string") {
        res.status(400)
        throw new Error("'password' invalido, deve ser uma string")
    }

      if (id.length < 1 || email.length < 1 || password.length < 1) {
          res.status(400)
          throw new Error("'id', 'email' ou 'password' devem ter no mínimo 1 caractere")
      }

        const newUser = { 
            id, 
            email, 
            password
        }

        await db("users").insert(newUser)

      res.status(200).send(`Cadastrado realizado com sucesso`)

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

//createProduct
app.post("/products", async (req: Request, res: Response) => {
  try {
      const {id, name, price, category} = req.body
      
      if (typeof id != "string") {
          res.status(400)
          throw new Error("'id' invalido, deve ser uma string")
      }

      if (typeof name != "string") {
          res.status(400)
          throw new Error("'name' invalido, deve ser uma string")
      }

      if (typeof price != "number") {
        res.status(400)
        throw new Error("'price' invalido, deve ser um number")
    }

    if (typeof category != "string") {
      res.status(400)
      throw new Error("'category' invalido, deve ser uma string")
  }

      if (id.length < 1 || name.length < 1 || price < 1 || category.length < 1) {
          res.status(400)
          throw new Error("'id', 'name', 'price' ou 'category' devem ter no mínimo 1 caractere")
      }

      const newProduct = { 
        id, 
        name, 
        price, 
        category
    }

    await db("products").insert(newProduct)

      res.status(200).send(`Produto cadastrado com sucesso`)

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

//createPurchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
      const {id, total_price, paid, delivered_at, buyer_id} = req.body

      if (typeof id != "string") {
          res.status(400)
          throw new Error("'id' invalido, deve ser uma string")
      }

      if (typeof total_price != "number") {
        res.status(400)
        throw new Error("'total_price' invalido, deve ser um number")
      }

      if (typeof paid != "number") {
        res.status(400)
        throw new Error("'paid' invalido, deve ser um number")
      }

      if (typeof buyer_id != "string") {
        res.status(400)
        throw new Error("'buyer_id' invalido, deve ser uma string")
      }

      if (id.length < 1 || total_price < 1 || buyer_id.length < 1) {
          res.status(400)
          throw new Error("'id', 'total_price', 'delivered_at' ou 'buyer_id' devem ter no mínimo 1 caractere")
      }

      await db.raw(`
          INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
          VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}");
      `)

        const newPurchase = { 
            id, 
            total_price, 
            paid, 
            delivered_at, 
            buyer_id
        }
        
        await db("users").insert(newPurchase)

      res.status(200).send(`Compra cadastrada com sucesso`)

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

  //exercicio 3
//getProductById
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

      const result = await db("products").where({id: id})

      res.status(200).send({produto: result})
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

//getUserPurchasesByUserId
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;

      const result = await db("purchases").where({buyer_id: user_id})

      res.status(200).send({compras: result})
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

// =====================================================================================================================
// aprofundamento knex
    // exercicio 1 - refatorar tudo com query
    // exercicio 2
// getPurchaseById
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id_purchase = req.params.id
        const boughtProducts = await db.select("purchases_products.product_id", "products.*")
        .from("purchases_products")
        .leftJoin("products", "purchases_products.product_id", "products.id")
        .where({purchase_id: id_purchase})

        const result = await db.select("purchases.*", "users.email", "users.id")
        .from("purchases")
        .leftJoin("users", "purchases.buyer_id", "users.id")
        .where({"purchases.id": id_purchase})

        res.status(200).send({"compra": result, "produtos": boughtProducts})

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