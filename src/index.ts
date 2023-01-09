import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { ProductCategory } from "./type";
//além de importar o express, também precisamos importar os objetos Request e Response
import  express, { Request, Response} from 'express'
// importar cors
import cors from 'cors';



// console.log(users);
// console.log(products);
// console.log(purchases);

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
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


// exercicio 2 
// getAllUsers
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

//getAllProducts
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

//getAllPurchases
app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

//searchProductByName
app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const searchProduct = products.filter((product) =>
        product.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(searchProduct)
})

// http://localhost:3003/products/search?q=creme


//exercicio 3
//createUser
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

//createProduct
app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

//createPurchase
app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})

