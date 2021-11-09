import React, { FC, useReducer } from 'react';
import axios from 'axios';

import DataContext from './DataContext';
import DataReducer, { DataReducerState } from './DataReducer';

import { GenericResponse, ProductGetResponse, Provider, ProviderDTO, ProviderGetResponse } from '../../types/Api';

const DataState: FC = ({ children }) => {

    const initialState: DataReducerState = {
        products: [],
        providers: [],
        editingProvider: null,
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

    const setEditingProvider = (payload: Provider | null) => {
        dispatch({
            type: 'SET_EDITING_PROVIDER',
            payload
        })
    }

    const editProvider = async (provider: Provider) => {
        try {
            const jsonInfo = JSON.stringify(provider);
            await axios.put<GenericResponse>(`http://localhost:4000/api/v1/provider?id=${provider.provider_id}`, jsonInfo);
            dispatch({
                type: 'UPDATE_PROVIDER',
                payload: provider
            })
        } catch(e: any) {
            console.log(e.response);
        }
    }

    const deleteProvider = async (id: number) => {
        try {
            const info = await axios.delete<GenericResponse>(`http://localhost:4000/api/v1/provider?id=${id}`);
            dispatch({
                type: 'DELETE_PROVIDER',
                payload: {
                    id,
                    response: info.data
                }
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
                editingProvider: state.editingProvider,
                response: state.response,
                fetchProducts,
                fetchProviders,
                postProvider,
                setEditingProvider,
                editProvider,
                deleteProvider,
            }}
        >
            { children }
        </DataContext.Provider>
    );
};

export default DataState;
