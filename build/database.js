"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "01",
        email: "pedro@gmail.com",
        password: "123456"
    }, {
        id: "02",
        email: "veronica@gmail.com",
        password: "bolodechocolate"
    }
];
exports.products = [
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
];
exports.purchases = [
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
];
//# sourceMappingURL=database.js.map