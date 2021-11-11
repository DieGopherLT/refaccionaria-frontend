import { Product, ProductDTO } from '../types/Api';

export function productDtoToProduct(product: Product, productDto: ProductDTO): Product {
    product.name = productDto.name;
    product.brand = productDto.brand;
    product.price = productDto.price;
    product.amount = productDto.amount;
    product.description = productDto.description;
    product.category.category_id = productDto.category_id;
    product.provider.provider_id = productDto.provider_id;
    return product;
}
