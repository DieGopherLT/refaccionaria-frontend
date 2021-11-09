import React, { FC, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ProductContext from './ProductContext';
import DataReducer, { ProductReducerState } from './ProductReducer';

import { ProductGetResponse } from '../../types/Api';

const ProductState: FC = ({ children }) => {

    const initialState: ProductReducerState = {
        products: [],
        response: null
    }

    const [state, dispatch] = useReducer(DataReducer, initialState);

    const fetchProducts = async () => {
        try {
            const info = await AxiosClient.get<ProductGetResponse>('/product');
            dispatch({ type: 'SET_PRODUCTS', payload: info.data.products });
        } catch(e: any) {
            console.log(e);
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                response: state.response,
                fetchProducts,
            }}
        >
            { children }
        </ProductContext.Provider>
    );
};

export default ProductState;
