export interface User {
    name: string;
    email: string;
}


export interface Auth {
    email: string,
    password: string
}

export interface Product {
    _id: string,
    name: string,
    price: string,
    currency: string,
    image: string
}