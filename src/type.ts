//Exercicio 1

// user
export type TUser = {
    id: string,
    name: string,
    email: string, 
    password: string,
    created_at: string 
}

// product
export type TProduct = {
    id: string, 
    name: string, 
    price: number,
    description: string,
    image_url: string
}

// purchase
export type TPurchase = {
    id: string,
    buyer: string,
    total_price: number,
    created_at: string,
    paid: number
}
