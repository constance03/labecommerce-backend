// user
export type TUser = {
    id: string
    email: string
    password: string
}

// product
export type TProduct = {
    id: string
    name: string
    price: number
    category: string
}

// purchase
export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}
