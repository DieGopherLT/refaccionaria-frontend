import { createContext } from 'react';
import { DataReducerState } from './DataReducer';
import { ProviderDTO } from '../types/Api';

interface DataContextProps extends DataReducerState {
    fetchProducts: () => Promise<void>;
    fetchProviders: () => Promise<void>;
    postProvider: (provider: ProviderDTO) => Promise<void>;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export default DataContext;
