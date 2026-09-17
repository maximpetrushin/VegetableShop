import { screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { render } from '../../test-utils/render';
import CartModal from './CartModal';
import CartContext from '../../context/CartContext';
import userEvent from '@testing-library/user-event';

describe('Cart modal', () => {
    it('Отображает сообщение о пустой корзине', () => {
        render(
            <CartContext.Provider
                value={{
                    cart: [],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 0,
                }}
            >
                <CartModal />
            </CartContext.Provider>
        );

        expect(screen.getByText('You cart is empty!')).toBeInTheDocument();
    });
    it('Отображает товар в корзине', () => {
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
                    cart: [
                        {
                            product,
                            qty: 2,
                        },
                    ],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 240,
                }}
            >
                <CartModal />
            </CartContext.Provider>
        );

        expect(screen.getByText('Broccoli - 1 Kg')).toBeInTheDocument();
        expect(screen.getAllByText('$240')).toHaveLength(2);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });
    it('Уменьшает количество товара кнопкой "-"', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const handleCartQty = vi.fn();

        render(
            <CartContext.Provider
                value={{
                    cart: [
                        {
                            product,
                            qty: 2,
                        },
                    ],
                    handleAddToCart: () => {},
                    handleCartQty,
                    getCartTotal: () => 240,
                }}
            >
                <CartModal />
            </CartContext.Provider>
        );

        const minusButton = screen.getByRole('button', { name: '-' });

        await user.click(minusButton);

        expect(handleCartQty).toHaveBeenCalledWith(1, 1);
    });
    it('Увеличивает количество товара кнопкой "+"', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const handleCartQty = vi.fn();

        render(
            <CartContext.Provider
                value={{
                    cart: [
                        {
                            product,
                            qty: 2,
                        },
                    ],
                    handleAddToCart: () => {},
                    handleCartQty,
                    getCartTotal: () => 240,
                }}
            >
                <CartModal />
            </CartContext.Provider>
        );

        const plusButton = screen.getByRole('button', { name: '+' });

        await user.click(plusButton);

        expect(handleCartQty).toHaveBeenCalledWith(1, 3);
    });

    it('Отображает общую стоимость товаров в корзине', () => {
        const product1 = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const product2 = {
            id: 2,
            name: 'Carrots - 1 Kg',
            price: 80,
            image: 'carrots.jpg',
            category: 'vegetables',
        };

        render(
            <CartContext.Provider
                value={{
                    cart: [
                        {
                            product: product1,
                            qty: 2,
                        },
                        {
                            product: product2,
                            qty: 3,
                        },
                    ],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 480,
                }}
            >
                <CartModal />
            </CartContext.Provider>
        );

        expect(screen.getByText('TOTAL:')).toBeInTheDocument();
        expect(screen.getByText('$480')).toBeInTheDocument();
    });

    it('Удаляет товар из корзины при уменьшении количества до нуля', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const handleCartQty = vi.fn();

        render(
            <CartContext.Provider
                value={{
                    cart: [
                        {
                            product,
                            qty: 1,
                        },
                    ],
                    handleAddToCart: () => {},
                    handleCartQty,
                    getCartTotal: () => 120,
                }}
            >
                <CartModal />
            </CartContext.Provider>
        );

        const minusButton = screen.getByRole('button', { name: '-' });

        await user.click(minusButton);

        expect(handleCartQty).toHaveBeenCalledWith(1, 0);
    });

});