import { createContext } from 'react';
import { SaleReducerState } from './SaleReducer';
import { Sale, SaleDTO } from '../../types/Api';

interface SaleContextProps extends SaleReducerState {
    fetchSales: () => void;
    postSale: (saleDto: SaleDTO) => Promise<void>;
    setEditingSale: (data: Sale | null) => void;
}

const SaleContext = createContext<SaleContextProps>({} as SaleContextProps);

export default SaleContext;
