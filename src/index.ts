import { users, products, purchases } from "./database";
//além de importar o express, também precisamos importar os objetos Request e Response
import  express, { Request, Response} from 'express'
// importar cors
import cors from 'cors';
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



// -----------------------------------------------------------------------------------

//Aprofundamento express
    // exercicio 1
//produtos por id
app.get('/products:id', (req: Request, res: Response) => {
    const id = req.params.id

    const productFound = products.find((product) => product.id === id)

    res.status(200).send(productFound)
})

//compras por id do usuario
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    const purchaseFound = purchases.find((purchase) => purchase.userId.toLowerCase() === id.toLowerCase())

    res.status(200).send(purchaseFound)
})

    // exercicio 2 
//deletar usuario por id
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = users.findIndex((user) => user.id === id)

    if (indexToRemove >= 0) {
        users.splice(indexToRemove, 1)
    }

    res.status(200).send("User apagado com sucesso")
})

//deletar produto por id
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = products.findIndex((product) => product.id === id)

    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)
    }

    res.status(200).send("Produto apagado com sucesso")
})

 // exercicio 2 
//editar usuario por id
app.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    if (user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Cadastro atualizado com sucesso")
})

//editar produto por id
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as ProductCategory | undefined

    const product = products.find((product) => product.id === id)

    if (product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
    }

    res.status(200).send("Produto atualizado com sucesso")
})