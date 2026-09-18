import {Loader, Text, SimpleGrid, Container, Flex} from "@mantine/core";
import ProductCard from "../ProductCard/ProductCard";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

type ProductProps = {
    products: Product[] | null,
}

function ProductList({products}: ProductProps) {
    if (!products) {
        return (
            <Container
                fluid
            >
                <Flex
                    justify="center"
                    align="center"
                    h='100vh'
                >
                    <Loader
                        color="gray"
                        size="xl"
                        type="bars"
                        data-testid="loader"
                    />
                </Flex>
            </Container>
        );
    }
    return (
           <Container
               fluid
               p={80}
               m='auto'
               bg='#f3f5fa'
           >
               <Text pb={60} fz={32} fw={600}> Catalog </Text>
               <SimpleGrid
                   cols={4}>
                   {products.map(product => (
                       <ProductCard key={product.id} product={product}/>
                   ))}
               </SimpleGrid>
           </Container>
    )
}

export default ProductList;