import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { ProductCategory } from "./type";

// console.log(users);
// console.log(products);
// console.log(purchases);

//Exercicio 2: chamando funções
//user
createUser("Matheus", "matheus@gmail.com", "matheus1234")
console.log(getAllUsers(users));

//product
createProduct("03", "Condicionador", 20, ProductCategory.PERSONAL_HYGIENE)
console.log(getAllProducts(products));
console.log(getProductById("02"))

//Exercicio 3: chamando mais funções
//product
console.log(queryProductsByName("shampoo"));

//purchase
createPurchase("Matheus", "01", 2, 80)
console.log(getAllPurchasesFromUserId("Bruno"));
