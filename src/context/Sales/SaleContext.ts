import { createContext } from 'react';
import { SaleReducerState } from './SaleReducer';
import { SaleDTO } from '../../types/Api';

interface SaleContextProps extends SaleReducerState {
    fetchSales: () => void;
    postSale: (saleDto: SaleDTO) => Promise<void>;
}

const SaleContext = createContext<SaleContextProps>({} as SaleContextProps);

export default SaleContext;
