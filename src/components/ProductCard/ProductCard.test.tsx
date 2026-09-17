import { screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { render } from '../../test-utils/render';
import ProductCard from './ProductCard';
import CartContext from '../../context/CartContext';
import userEvent from '@testing-library/user-event';

describe('Product card', () => {
    it('Отображает информацию о товаре', () => {
        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        render(
            <CartContext.Provider
                value={{
                    cart: [],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 0,
                }}
            >
                <ProductCard product={product} />
            </CartContext.Provider>
        );

        expect(screen.getByText('Broccoli - 1 Kg')).toBeInTheDocument();
        expect(screen.getByText('$ 120')).toBeInTheDocument();
    });
    it('Изменяет количество товара кнопками "+" и "-"', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        render(

            <CartContext.Provider
                value={{
                    cart: [],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 0,
                }}
            >
                <ProductCard product={product} />
            </CartContext.Provider>

        )

        const plusbutton = screen.getByRole('button', {name: '+'})
        const minusButton = screen.getByRole('button', {name: '-'})

        expect(screen.getByText('1')).toBeInTheDocument();

        await user.click(plusbutton);

        expect(screen.getByText('2')).toBeInTheDocument();

        await user.click(minusButton);

        expect(screen.getByText('1')).toBeInTheDocument();
    })


    it('При значении товара "1" кнопка "-" неактивна', () => {

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        render(

            <CartContext.Provider
                value={{
                    cart: [],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 0,
                }}
            >
                <ProductCard product={product} />
            </CartContext.Provider>
        )

        const minusButton = screen.getByRole('button', { name: '-' });

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(minusButton).toBeDisabled();
    })
    it('При нажатии на кнопку "Add to Cart" товар добавляется в выбраном количестве', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const handleAddToCart = vi.fn()

        render(

            <CartContext.Provider
                value={{
                    cart: [],
                    handleAddToCart,
                    handleCartQty: () => {},
                    getCartTotal: () => 0,
                }}
            >
                <ProductCard product={product} />
            </CartContext.Provider>
        )

        const addToCartButton = screen.getByRole('button', { name: 'Add to cart' });

        expect(screen.getByText('1')).toBeInTheDocument()

        await user.click(addToCartButton);

        expect(handleAddToCart).toHaveBeenCalledWith(product, 1);

        const plusbutton = screen.getByRole('button', { name: '+' });

        await user.click(plusbutton);

        expect(screen.getByText('2')).toBeInTheDocument()

        await user.click(addToCartButton);

        expect(handleAddToCart).toHaveBeenCalledWith(product, 2);

    })
});