import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ProductContext from './ProductContext';
import DataReducer, { ProductReducerState } from './ProductReducer';

import { BrandResponse, CategoryResponse, GenericResponse, ProductDTO, ProductGetResponse } from '../../types/Api';

const ProductState: FC = ({ children }) => {

    const initialState: ProductReducerState = {
        products: [],
        brands: [],
        categories: [],
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
            const jsonInfo = JSON.stringify(product);
            await AxiosClient.post<GenericResponse>('/product', jsonInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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
                fetchProducts,
                postProduct,
                deleteProduct
            }}
        >
            { children }
        </ProductContext.Provider>
    );
};

export default ProductState;
