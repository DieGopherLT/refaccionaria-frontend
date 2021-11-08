import React, { FC, useReducer } from 'react';
import axios from 'axios';

import DataContext from './DataContext';
import DataReducer, { DataReducerState } from './DataReducer';

import { ProductGetResponse, ProviderGetResponse } from '../types/Api';

const DataState: FC = ({ children }) => {

    const initialState: DataReducerState = {
        products: [],
        providers: []
    }

    const [state, dispatch] = useReducer(DataReducer, initialState);

    const fetchProducts = async () => {
        try {
            const info = await axios.get<ProductGetResponse>('http://localhost:4000/api/v1/product');
            dispatch({
                type: 'SET_PRODUCTS',
                payload: info.data.products
            });
        } catch(e: any) {
            console.log(e);
        }
    }

    const fetchProviders = async () => {
        try {
            const info = await axios.get<ProviderGetResponse>('http://localhost:4000/api/v1/provider');
            dispatch({
                type: 'SET_PROVIDERS',
                payload: info.data.providers
            })
        } catch(e: any) {
            console.log(e);
        }
    }

    return (
        <DataContext.Provider
            value={{
                products: state.products,
                providers: state.providers,
                fetchProducts,
                fetchProviders,
            }}
        >
            { children }
        </DataContext.Provider>
    );
};

export default DataState;
