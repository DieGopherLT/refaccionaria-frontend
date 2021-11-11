import { createContext } from 'react';
import { SaleReducerState } from './SaleReducer';

interface SaleContextProps extends SaleReducerState {
    fetchSales: () => void;
}

const SaleContext = createContext<SaleContextProps>({} as SaleContextProps);

export default SaleContext;
