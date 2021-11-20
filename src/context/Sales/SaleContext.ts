import { createContext } from 'react';
import { SaleReducerState } from './SaleReducer';
import { GenericResponse, Sale, SaleDTO } from '../../types/Api';

interface SaleContextProps extends SaleReducerState {
    fetchSales: () => void;
    postSale: (saleDto: SaleDTO) => Promise<GenericResponse>;
    setEditingSale: (data: Sale | null) => void;
    updateSale: (data: SaleDTO, sale: Sale) => Promise<GenericResponse>;
    deleteSale: (saleId: number) => Promise<GenericResponse>;
}

const SaleContext = createContext<SaleContextProps>({} as SaleContextProps);

export default SaleContext;
