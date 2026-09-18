import { Box, Group, Pill, Button, Popover, ScrollArea } from "@mantine/core";
import {useContext} from "react";
import {ShoppingCartIcon} from "@phosphor-icons/react";
import CartContext from "../../context/CartContext";
import CartModal from "../CartModal/CartModal";


function Header() {

    const context = useContext(CartContext);

    const cartIcon = <ShoppingCartIcon size={20}/>;

    if (!context) {
        return null;
    }

    return (
        <Box
            top={0}
            bg="white"
            h={59}
            px={20}
            pos="sticky"
            style={{zIndex: 1000000,}}
        >
            <Group justify="space-between" h='100%'>
                <Group>
                    <Pill
                        bg='light-gray'
                        pos="relative"
                        fz={20}
                        fw={600}
                        px={10}
                        pr={80}>
                        Vegetable
                        <Pill
                            bg='green'
                            pos='absolute'
                            c='white'
                            px={10}
                            fz={20}
                            right={0}>
                            SHOP
                        </Pill>
                    </Pill>
                </Group>
                <Group>
                    <Popover
                        position='bottom-end'
                        offset={{mainAxis: 20}}
                        withOverlay
                        overlayProps={{zIndex: 10001, blur: '3px'}}
                        zIndex={10002}
                    >
                        <Popover.Target>
                            <Button
                                color='cartButton'
                                variant='filled'
                                rightSection={cartIcon}
                            >
                                <Group gap={8}>
                                    {context.cart.length !== 0 &&
                                        (<Pill>{context.cart.length} / ${context.getCartTotal()}</Pill>)}
                                    Cart
                                </Group>
                            </Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <ScrollArea.Autosize mah={300} maw={400} mx="auto">
                                <CartModal/>
                            </ScrollArea.Autosize>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </Group>

        </Box>
    )
}

export default Header;