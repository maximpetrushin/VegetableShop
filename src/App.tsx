import {useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList'
import Header from './components/Header/Header'
import CartContext from "./context/CartContext.tsx";



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


function App() {

    const [products, setProducts] = useState<Product[] | null>(null)

    const [cart, setCart] = useState<CartItem[]>([])

    const handleAddToCart = (product: Product, qty: number) => {
        setCart(prev => {
            if (prev.some(cartItem => cartItem.product.id === product.id)) {
                return prev.map(cartItem => cartItem.product.id === product.id ? {
                    product: cartItem.product,
                    qty: cartItem.qty + qty
                } : cartItem)
            }
            return [...prev, {product, qty}]
        })
    }

    const handleCartQty = (productId: number ,newQty: number) => {
        setCart(prev => {
            if (newQty === 0) {
                return prev.filter(item => item.product.id !== productId)
            }
            return prev.map(item => item.product.id === productId ? {...item, qty: newQty} : item)
        })
    }

    const getCartTotal = () => {
       return cart.reduce( (acc, item) => acc + item.product.price * item.qty, 0 )
    }


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, []);


    return (
        <CartContext.Provider value={
            {cart,
            handleAddToCart,
            handleCartQty,
            getCartTotal}
        }>
            <Header />
            <ProductList
                 products={products}  />
        </CartContext.Provider>
    )

}

export default App
