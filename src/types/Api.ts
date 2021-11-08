export interface ProductGetResponse {
    error: boolean;
    products: Product[];
}

export interface ProviderGetResponse {
    error: boolean;
    providers: Provider[];
}

export interface GenericResponse {
    message: string;
    error: boolean;
}

export interface Product {
    product_id: number;
    name: string;
    brand: string;
    price: number;
    amount: number;
    description: string;
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
}

export interface Provider extends ProviderDTO{
    provider_id: number;
}
