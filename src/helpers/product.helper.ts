import { Product, ProductDTO } from '../types/Api';

export function productDtoToProduct(product: Product, productDto: ProductDTO): Product {
    product.classification = productDto.classification;
    product.brand = productDto.brand;
    product.public_price = productDto.public_price;
    product.provider_price = productDto.provider_price;
    product.amount = productDto.amount;
    product.category.category_id = productDto.category_id;
    product.provider.provider_id = productDto.provider_id;
    return product;
}
