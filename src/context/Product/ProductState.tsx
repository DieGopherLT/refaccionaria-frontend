import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ProductContext from './ProductContext';
import DataReducer, { ProductReducerState } from './ProductReducer';
import { productDtoToProduct } from '../../helpers/products';

import {
    BrandResponse,
    CategoryResponse,
    GenericResponse,
    Product,
    ProductDTO,
    ProductGetResponse,
} from '../../types/Api';

const ProductState: FC = ({ children }) => {

    const initialState: ProductReducerState = {
        products: [],
        brands: [],
        categories: [],
        editingProduct: null,
        response: null
    }

    const [state, dispatch] = useReducer(DataReducer, initialState);

    useEffect(() => {
        const fetchStuff = async () => {
            const brandsPromise = AxiosClient.get<BrandResponse>('/brand');
            const categoriesPromise = AxiosClient.get<CategoryResponse>('/category');

            const [ brands, categories ] = await Promise.all( [brandsPromise, categoriesPromise] );
            dispatch({
                type: 'SET_BRANDS_CATEGORIES',
                payload: {
                    brands: brands.data.brands,
                    categories: categories.data.categories
                }
            });
        }
        fetchStuff();
    }, []);


    const fetchProducts = async () => {
        try {
            const info = await AxiosClient.get<ProductGetResponse>('/product');
            dispatch({ type: 'SET_PRODUCTS', payload: info.data.products });
        } catch(e: any) {
            console.log(e);
        }
    }

    const postProduct = async (product: ProductDTO) => {
        try {
            await AxiosClient.post<GenericResponse>('/product', product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch(e: any) {
            console.log(e.response);
        }
    }

    const setEditingProduct = (product: Product | null) => {
        dispatch({ type: 'SET_EDITING_PRODUCT', payload: product });
    }

    const updateProduct = async (product: Product, productDto: ProductDTO) => {
        try {
            await AxiosClient.put<GenericResponse>(`/product?id=${product.product_id}`, productDto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'UPDATE_PRODUCT', payload: productDtoToProduct(product, productDto) });
        } catch(e: any) {
            console.log(e.response);
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            await AxiosClient.delete<GenericResponse>(`/product?id=${id}`);
            dispatch({ type: 'DELETE_PRODUCT', payload: id });
        } catch(e: any) {
            console.log(e.response);
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                brands: state.brands,
                categories: state.categories,
                response: state.response,
                editingProduct: state.editingProduct,
                fetchProducts,
                postProduct,
                setEditingProduct,
                updateProduct,
                deleteProduct
            }}
        >
            { children }
        </ProductContext.Provider>
    );
};

export default ProductState;
