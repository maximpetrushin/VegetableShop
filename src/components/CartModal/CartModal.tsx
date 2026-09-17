import {Box, Text, Group, Image, ActionIcon, Stack, Divider} from "@mantine/core";
import {useContext} from "react";
import CartContext from "../../context/CartContext.tsx";







function CartModal() {

    const context = useContext(CartContext);

    if (!context) {
        return null;
    }

    return (
        <Stack>
            {context.cart.length !== 0 ? (
                <>
                {context.cart.map(item =>
                    <Box key={item.product.id}>
                        <Group justify='space-between'>
                            <Group>
                                <Image
                                    w={80}
                                    fit={"contain"}
                                    src={item.product.image}
                                />
                                <Stack gap={4}>
                                    <Text>{item.product.name}</Text>
                                    <Text>{"$" + item.product.price * item.qty}</Text>
                                </Stack>
                            </Group>
                            <Group>
                                <ActionIcon
                                    variant="light"
                                    color="qtyButton"
                                    onClick={() => context.handleCartQty(item.product.id, item.qty - 1)}
                                >
                                    -
                                </ActionIcon>

                                <Text>{item.qty}</Text>

                                <ActionIcon
                                    variant="light"
                                    color="qtyButton"
                                    onClick={() => context.handleCartQty(item.product.id, item.qty + 1)}
                                >
                                    +
                                </ActionIcon>
                            </Group>
                        </Group>
                        <Divider/>
                    </Box>
                )}
                    <Box>
                        <Group justify='space-between'>
                            <Text>TOTAL:</Text>
                            <Text>{'$' + context.getCartTotal()}</Text>
                        </Group>
                    </Box>
                </>
            ) : (
                <Stack align='center'>
                    <Image src='/images/cart_empty.svg' w={118}/>
                    <Text color='gray'>You cart is empty!</Text>
                </Stack>)}
        </Stack
            >
    )
}


export default CartModal;