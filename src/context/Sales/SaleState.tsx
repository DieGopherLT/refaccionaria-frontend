import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import SaleContext from './SaleContext';
import SaleReducer, { SaleReducerState } from './SaleReducer';

import { SaleGetResponse } from '../../types/Api';

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

    return(
        <SaleContext.Provider
            value={{
                sales: state.sales,
                fetchSales
            }}
        >
            { children }
        </SaleContext.Provider>
    );
}

export default SaleState;

