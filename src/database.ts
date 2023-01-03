import { TUser, TProduct, TPurchase } from "./type"

export const users: TUser[] = [
    {
        id: "01",
        email: "pedro@gmail.com",
        password: "123456"
    }, {
        id: "02",
        email: "veronica@gmail.com",
        password: "bolodechocolate"
    }
]

export const products: TProduct[] = [
    {
        id: "01",
        name: "creme de rosto",
        price: 40,
        category: "cosmético"
    },
    {
        id: "02",
        name: "shampoo",
        price: 20,
        category: "higiene pessoal"
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "01",
        productId: "01",
        quantity: 2,
        totalPrice: 80,
    },
    {
        userId: "02",
        productId: "02",
        quantity: 4,
        totalPrice: 80
    }
]

