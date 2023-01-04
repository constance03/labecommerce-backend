//Exercicio 1
//Refatore o type da entidade product no types.ts
export enum ProductCategory {
    COSMETIC = "Cosmético",
    PERSONAL_HYGIENE = "Higiene Pessoal"
}

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
    category: ProductCategory
}

// purchase
export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}
