import { createContext } from 'react';
import { ProductReducerState } from './ProductReducer';

interface DataContextProps extends ProductReducerState {
    fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<DataContextProps>({} as DataContextProps);

export default ProductContext;
