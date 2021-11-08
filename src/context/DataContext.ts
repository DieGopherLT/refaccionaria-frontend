import { createContext } from 'react';
import { DataReducerState } from './DataReducer';

interface DataContextProps extends DataReducerState {
    fetchProducts: () => Promise<void>;
    fetchProviders: () => Promise<void>;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export default DataContext;
