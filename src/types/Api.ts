export interface ProductGetResponse {
    error: boolean;
    products: Product[];
}

export interface ProviderGetResponse {
    error: boolean;
    providers: Provider[];
}

export interface SaleGetResponse {
    error: boolean;
    sales: Sale[];
}

export interface DeliveryGetResponse {
    deliveries: Delivery[];
    error:      boolean;
}

export interface ClientGetResponse {
    clients: Client[]
    error: boolean;
}

export interface GenericResponse {
    message: string;
    error: boolean;
}

export interface BrandResponse {
    brands: string[];
    error: false;
}

export interface CategoryResponse {
    categories: Category[]
    error: boolean;
}

export interface ProductDTO {
    classification: string;
    brand: string;
    public_price: number;
    provider_price: number;
    amount: number;
    category_id: number;
    provider_id: number;
}

export interface Product {
    product_id: number;
    classification: string;
    brand: string;
    public_price: number;
    provider_price: number;
    amount: number;
    category: Category;
    provider: Provider;
}

export interface Category {
    category_id: number;
    name: string;
}

export interface ProviderDTO {
    email: string;
    name: string;
    phone: string;
    enterprise: string;
    address: string;
}

export interface Provider extends ProviderDTO{
    provider_id: number;
}

export interface Sale {
    sale_id: number;
    client_id: number;
    date:    Date;
    amount:  number;
    subtotal: number;
    total:   number;
    product: Product;
}

export interface SaleDTO {
    product_id: number;
    client_id: number;
    subtotal: number;
    total: number;
    amount: number;
}

export interface Delivery {
    delivery_date: string;
    product:       Product;
    provider:      Provider;
    amount:        number;
}

export interface DeliveryDTO {
    product_id: number;
    provider_id: number;
    delivery_date: Date;
    amount: number;
}

export interface Client extends ClientDTO {
    client_id: number;
}

export interface ClientDTO {
    name: string;
    address: string;
    phone: string;
}
