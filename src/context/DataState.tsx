import React, { FC, useReducer } from 'react';
import axios from 'axios';

import DataContext from './DataContext';
import DataReducer, { DataReducerState } from './DataReducer';

import { GenericResponse, ProductGetResponse, ProviderDTO, ProviderGetResponse } from '../types/Api';

const DataState: FC = ({ children }) => {

    const initialState: DataReducerState = {
        products: [],
        providers: [],
        response: null
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

    const postProvider = async (provider: ProviderDTO) => {
        try {
            const jsonInfo = JSON.stringify(provider);
            const info = await axios.post<GenericResponse>('http://localhost:4000/api/v1/provider', jsonInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({
                type: 'SET_RESPONSE',
                payload: info.data
            })
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <DataContext.Provider
            value={{
                products: state.products,
                providers: state.providers,
                response: state.response,
                fetchProducts,
                fetchProviders,
                postProvider,
            }}
        >
            { children }
        </DataContext.Provider>
    );
};

export default DataState;
