import React from 'react';
import { Link } from 'react-router-dom';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';
import Table from '../components/Table/Table';

const Deliveries = () => {
    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5">
                <Link
                    to="/entregas/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-52"
                >Hacer una nueva orden</Link>
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

export default Deliveries;
