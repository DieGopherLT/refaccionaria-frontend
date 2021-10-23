import React from 'react';

import AppContainer from './components/UI/AppContainer';
import Wrapper from './components/UI/Wrapper';
import Navigation from './components/Navbar/Navigation';
import Table from './components/Table/Table';

import { navData } from './data/Navigation';

interface Product {
    id: number;
    name: string;
    desc: string;
    price: number;
    amount: number;
}

function App() {

    const products: Product[] = [
        {
            id: 1,
            name: 'Aceite',
            desc: 'Aceite de motor',
            price: 100,
            amount: 20
        },
        {
            id: 2,
            name: 'bugia',
            desc: 'reemplazo de bugia',
            price: 50,
            amount: 0
        },
        {
            id: 3,
            name: 'llanta',
            desc: 'reemplazo de llanta',
            price: 135,
            amount: 5
        }
    ]

    return (
        <AppContainer>
            <div className="h-20 bg-blue-900 lg:h-full">
                <Wrapper className="h-full">
                    <Navigation data={ navData } />
                </Wrapper>
            </div>
            <div className="flex-grow">
                <Table data={ products }>
                    <th className="p-1 border border-blue-600 lg:w-9">ID</th>
                    <th className="p-1 border border-blue-600 lg:w-12">Nombre</th>
                    <th className="p-1 border border-blue-600 lg:w-32">Descripcion</th>
                    <th className="p-1 border border-blue-600 lg:w-8">Precio</th>
                    <th className="p-1 border border-blue-600 lg:w-8">Cantidad</th>
                    <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                </Table>
            </div>
        </AppContainer>
    );
}

export default App;
