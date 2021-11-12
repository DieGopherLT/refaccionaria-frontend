import { createContext } from 'react';
import { ProductReducerState } from './ProductReducer';
import { Product, ProductDTO } from '../../types/Api';

interface DataContextProps extends ProductReducerState {
    fetchProducts: () => void;
    postProduct: (product: ProductDTO) => Promise<void>;
    setEditingProduct: (product: Product | null) => void;
    updateProduct: (product: Product, productDto: ProductDTO) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    fetchBrands: () => void;
}

const ProductContext = createContext<DataContextProps>({} as DataContextProps);

export default ProductContext;
