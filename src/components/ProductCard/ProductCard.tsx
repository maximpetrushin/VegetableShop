import { Card, Image, Text, Stack, Group, ActionIcon, Button } from '@mantine/core';
import {useCounter} from "@mantine/hooks";
import {useContext} from "react";
import CartContext from "../../context/CartContext.tsx";
import {ShoppingCartIcon} from "@phosphor-icons/react";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

type ProductCardProps = {
    product: Product;
}



function ProductCard({product}: ProductCardProps) {

    const cartIcon = <ShoppingCartIcon size={20}/>

    const [qty, {increment, decrement}] = useCounter(1, {min: 1});

    const context = useContext(CartContext);

    if (!context) {
        return null;
    }

    return (

        <Card
            w={302}
            h={414}
            p={16}
            radius={16}
        >

            <Stack gap={16}>
                <Image
                    src={product.image}
                    alt={product.name}
                    height={276}
                    w="100%"/>
                <Group justify='space-between'>
                    <Text>{product.name}</Text>
                    <Group>
                        <ActionIcon variant="light" color="qtyButton" disabled={qty === 1} onClick={decrement}>-</ActionIcon>
                        <Text>{qty}</Text>
                        <ActionIcon variant="light" color="qtyButton" onClick={increment}>+</ActionIcon>
                    </Group>
                </Group>
                <Group justify='space-between'>
                    <Text fw='bold'>{'$ ' + product.price}</Text>
                    <Button
                        onClick={() => context.handleAddToCart(product, qty)}
                        color='cartButton'
                        variant='light'
                        rightSection={cartIcon}
                    >
                        Add to cart
                    </Button>
                </Group>
            </Stack>

        </Card>

    )
}

export default ProductCard;