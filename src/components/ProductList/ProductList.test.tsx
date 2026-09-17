import { screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { render } from '../../test-utils/render';
import ProductList from './ProductList';
import CartContext from '../../context/CartContext';

describe('Product list', () => {
    it('Отображается лоадер до загрузки данных из API', () => {
        render(<ProductList products={null} />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
    it('Отображает элементы на странице после загрузки API', () => {
        const products = [
            {
                id: 1,
                name: 'Broccoli - 1 Kg',
                price: 120,
                image: 'broccoli.jpg',
                category: 'vegetables',
            },
            {
                id: 2,
                name: 'Carrots - 1 Kg',
                price: 80,
                image: 'carrots.jpg',
                category: 'vegetables',
            },
        ];
        render(
            <CartContext.Provider
                value={{
                    cart: [],
                    handleAddToCart: () => {},
                    handleCartQty: () => {},
                    getCartTotal: () => 0,
                }}
            >
                <ProductList products={products} />
            </CartContext.Provider>
        );
        expect(screen.getByText('Broccoli - 1 Kg')).toBeInTheDocument();
        expect(screen.getByText('Carrots - 1 Kg')).toBeInTheDocument();
    })
});