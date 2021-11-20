import { createContext } from 'react';
import { ProductReducerState } from './ProductReducer';
import { GenericResponse, Product, ProductDTO } from '../../types/Api';

interface DataContextProps extends ProductReducerState {
    fetchProducts: () => void;
    postProduct: (product: ProductDTO) => Promise<GenericResponse>;
    setEditingProduct: (product: Product | null) => void;
    updateProduct: (product: Product, productDto: ProductDTO) => Promise<GenericResponse>;
    deleteProduct: (id: number) => Promise<GenericResponse>;
    fetchBrands: () => void;
}

const ProductContext = createContext<DataContextProps>({} as DataContextProps);

export default ProductContext;
