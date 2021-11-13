import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import SaleContext from '../context/Sales/SaleContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';
import Button from '../components/UI/Button';

import { Sale } from '../types/Api';

const Home: FC<RouteComponentProps> = props => {

    const { sales, setEditingSale } = useContext(SaleContext);

    const openEditForm = (data: Sale | null) => {
        setEditingSale(data);
        props.history.push('/ventas/nuevo');
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5 flex justify-between md:justify-start gap-2">
                <Link
                    to="/ventas/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-44"
                >Agregar nueva venta</Link>

                <Link
                    to="/ventas/resumen"
                    className="text-white text-center bg-blue-500 hover:bg-blue-700 p-3 rounded block w-full lg:w-52"
                >Ver resumen de ventas</Link>
            </Wrapper>
            <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
                <table className="w-full border-collapse lg:table-fixed">
                    <thead>
                        <tr>
                            <th className="p-1 border border-blue-600 lg:w-14">Producto</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Marca</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Cantidad</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Precio</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Total</th>
                            <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sales.map(sale => (
                            <tr key={ sale.sale_id }>
                                <td className="p-1 border border-blue-600">{ sale.product.name }</td>
                                <td className="p-1 border border-blue-600">{ sale.product.brand }</td>
                                <td className="p-1 border border-blue-600">{ sale.amount }</td>
                                <td className="p-1 border border-blue-600">{ sale.product.price }</td>
                                <td className="p-1 border border-blue-600">{ sale.total }</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="yellow"
                                                type="button"
                                                text="Editar"
                                                onClick={ () => openEditForm(sale) }
                                            />
                                        </div>
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="red"
                                                type="button"
                                                text="Borrar"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </Wrapper>
        </PageContainer>
    );
};

export default Home;
