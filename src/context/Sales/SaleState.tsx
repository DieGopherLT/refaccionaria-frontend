import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import SaleContext from './SaleContext';
import SaleReducer, { SaleReducerState } from './SaleReducer';

import { GenericResponse, SaleDTO, SaleGetResponse } from '../../types/Api';

const SaleState: FC = ({ children }) => {

    const initialState: SaleReducerState = {
        sales: [],
        shouldFetchSales: true
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
            await AxiosClient.post<GenericResponse>('/sale', sale, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchSales();
        } catch(e: any) {
            console.log(e.response.data);
        }
    }

    return(
        <SaleContext.Provider
            value={{
                sales: state.sales,
                fetchSales,
                postSale
            }}
        >
            { children }
        </SaleContext.Provider>
    );
}

export default SaleState;

