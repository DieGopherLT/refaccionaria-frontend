import { createContext } from 'react';
import { ProductReducerState } from './ProductReducer';
import { ProductDTO } from '../../types/Api';

interface DataContextProps extends ProductReducerState {
    fetchProducts: () => Promise<void>;
    postProduct: (product: ProductDTO) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<DataContextProps>({} as DataContextProps);

export default ProductContext;
