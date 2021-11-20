import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ProductContext from './ProductContext';
import DataReducer, { ProductReducerState } from './ProductReducer';
import { productDtoToProduct } from '../../helpers/product.helper';

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
        shouldFetchProducts: true,
        brands: [],
        categories: [],
        shouldFetchBrands: true,
        editingProduct: null,
        response: null
    }

    const [state, dispatch] = useReducer(DataReducer, initialState);

    useEffect(() => {
        if (state.shouldFetchProducts) {
            AxiosClient.get<ProductGetResponse>('/product')
                .then(result => dispatch({ type: 'SET_PRODUCTS', payload: result.data.products }))
        }
    }, [state.shouldFetchProducts]);

    useEffect(() => {
        if (state.shouldFetchBrands) {
            AxiosClient.get<BrandResponse>('/brand')
                .then(response => dispatch({ type: 'SET_BRANDS', payload: response.data.brands }))
        }
    }, [state.shouldFetchBrands]);

    useEffect(() => {
        AxiosClient.get<CategoryResponse>('/category')
            .then(response => dispatch({ type: 'SET_CATEGORIES', payload: response.data.categories }))
    }, []);

    const fetchBrands = () => dispatch({ type: 'FETCH_BRANDS' });

    const fetchProducts = () => dispatch({ type: 'FETCH_PRODUCTS' });

    const postProduct = async (product: ProductDTO) => {
        try {
            const response = await AxiosClient.post<GenericResponse>('/product', product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const setEditingProduct = (product: Product | null) => {
        dispatch({ type: 'SET_EDITING_PRODUCT', payload: product });
    }

    const updateProduct = async (product: Product, productDto: ProductDTO) => {
        try {
            const response = await AxiosClient.put<GenericResponse>(`/product?id=${product.product_id}`, productDto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'UPDATE_PRODUCT', payload: productDtoToProduct(product, productDto) });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            const response = await AxiosClient.delete<GenericResponse>(`/product?id=${id}`);
            dispatch({ type: 'DELETE_PRODUCT', payload: id });
            return response.data;
        } catch(e: any) {
            return e.response.data;
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
                deleteProduct,
                fetchBrands
            }}
        >
            { children }
        </ProductContext.Provider>
    );
};

export default ProductState;
