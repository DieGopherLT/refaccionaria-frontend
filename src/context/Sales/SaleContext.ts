import { createContext } from 'react';
import { SaleReducerState } from './SaleReducer';

interface SaleContextProps extends SaleReducerState {}

const SaleContext = createContext<SaleContextProps>({} as SaleContextProps);

export default SaleContext;
