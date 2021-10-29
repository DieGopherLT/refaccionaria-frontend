import React, { FC, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import PageContainer from '../components/UI/PageContainer';
import Table from '../components/Table/Table';
import Wrapper from '../components/UI/Wrapper';

interface ProductsProps extends RouteComponentProps{}

const Products: FC<ProductsProps> = () => {

    useEffect(() => {
        console.log('Entering on product page');
        return () => {
            console.log('Leaving product page')
        }
    }, []);

    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5">
                <Link
                    to="/productos/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-48"
                >Crear producto nuevo</Link>
            </Wrapper>
            <Table data={ [] }>
                <th className="p-1 border border-blue-600 lg:w-9">ID</th>
                <th className="p-1 border border-blue-600 lg:w-12">Nombre</th>
                <th className="p-1 border border-blue-600 lg:w-32">Descripcion</th>
                <th className="p-1 border border-blue-600 lg:w-8">Precio</th>
                <th className="p-1 border border-blue-600 lg:w-8">Cantidad</th>
                <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
            </Table>
        </PageContainer>
    );
};

export default Products;
