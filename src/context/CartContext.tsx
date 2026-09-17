import { createContext } from "react";

type CartContext = {
    cart: CartItem[];
    handleAddToCart: (product: Product, qty: number) => void;
    handleCartQty: (productId:number, newQty: number) => void;
    getCartTotal: () => number;
}

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
};

type CartItem = {
    product: Product;
    qty: number;
}

const CartContext = createContext<CartContext | null>(null)

export default CartContext