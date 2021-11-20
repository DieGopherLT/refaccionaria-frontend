import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import SaleContext from './SaleContext';
import SaleReducer, { SaleReducerState } from './SaleReducer';

import { GenericResponse, Sale, SaleDTO, SaleGetResponse } from '../../types/Api';

const SaleState: FC = ({ children }) => {

    const initialState: SaleReducerState = {
        sales: [],
        shouldFetchSales: true,
        editingSale: null
    }

    const [state, dispatch] = useReducer(SaleReducer, initialState);

    useEffect(() => {
        if (state.shouldFetchSales) {
            AxiosClient.get<SaleGetResponse>('/sale')
                .then(response => dispatch({ type: 'SET_SALES', payload: response.data.sales }))
        }
    }, [state.shouldFetchSales]);

    const fetchSales = () => dispatch({ type: 'FETCH_SALES' });

    const postSale = async (sale: SaleDTO) => {
        try {
            const response = await AxiosClient.post<GenericResponse>('/sale', sale, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const setEditingSale = (data: Sale | null) => dispatch({ type: 'SET_EDITING_SALE', payload: data });

    const updateSale = async (data: SaleDTO, sale: Sale) => {
        try {
            const response = await AxiosClient.put<GenericResponse>(`/sale?id=${sale.sale_id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const deleteSale = async (saleId: number) => {
        try {
            const response = await AxiosClient.delete<GenericResponse>(`/sale?id=${saleId}`);
            dispatch({ type: 'DELETE_SALE', payload: saleId });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    return(
        <SaleContext.Provider
            value={{
                sales: state.sales,
                editingSale: state.editingSale,
                fetchSales,
                postSale,
                setEditingSale,
                updateSale,
                deleteSale
            }}
        >
            { children }
        </SaleContext.Provider>
    );
}

export default SaleState;

