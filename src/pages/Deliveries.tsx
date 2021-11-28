import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProductContext from '../context/Product/ProductContext';
import DeliveryContext from '../context/Delivery/DeliveryContext';

import PageContainer from '../components/UI/PageContainer';
import ActionsContainer from '../components/UI/ActionsContainer';
import Table from '../components/Table/Table';
import TableHeading from '../components/Table/TableHeading';
import TableHeadingColumn from '../components/Table/TableHeadingColumn';
import TableDataCell from '../components/Table/TableDataCell';
import Button from '../components/UI/Button';

import { ToastAlertOptions as options } from '../data/ToastAlert';

const Deliveries: FC<RouteComponentProps> = props => {

    const { fetchProducts } = useContext(ProductContext);
    const { deliveries, deleteDelivery } = useContext(DeliveryContext);

    const deleteDeli = async (productId: number, providerId: number) => {
        const { error, message } = await deleteDelivery(productId, providerId);
        if (error) {
            toast.error(message, options);
            return;
        }
        toast.success(message, options);
        fetchProducts();
    }

    return (
        <PageContainer>
            <ActionsContainer>
                <Link
                    to="/entregas/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-52"
                >Hacer una nueva orden</Link>
            </ActionsContainer>
            <Table>
                <TableHeading>
                    <TableHeadingColumn className="lg:w-16">Nombre</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-16">Marca</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-12">Proveedor</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-24">Correo</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-12">Ordenado el</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-12">Cantidad</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-28">Acciones</TableHeadingColumn>
                </TableHeading>
                <tbody>
                { deliveries.map((delivery, index) => (
                    <tr key={ index }>
                        <TableDataCell> { delivery.product.name } </TableDataCell>
                        <TableDataCell> { delivery.product.brand } </TableDataCell>
                        <TableDataCell> { delivery.provider.name } </TableDataCell>
                        <TableDataCell> { delivery.provider.email } </TableDataCell>
                        <TableDataCell> { delivery.delivery_date.split('T')[0] } </TableDataCell>
                        <TableDataCell> { delivery.amount } </TableDataCell>
                        <td className="p-1 border border-blue-600">
                            <div className="flex justify-around gap-2 lg:gap-0">
                                <div className="w-full md:w-28">
                                    <Button
                                        color="blue"
                                        type="button"
                                        text="Dar de alta"
                                        onClick={ () => deleteDeli(delivery.product.product_id, delivery.provider.provider_id) }
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                )) }
                </tbody>

            </Table>
        </PageContainer>
    );
};

export default Deliveries;
