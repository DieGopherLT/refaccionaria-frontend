import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ProductContext from '../context/Product/ProductContext';
import SaleContext from '../context/Sales/SaleContext';

import PageContainer from '../components/UI/PageContainer';
import ActionsContainer from '../components/UI/ActionsContainer';
import Table from '../components/Table/Table';
import TableHeading from '../components/Table/TableHeading';
import TableHeadingColumn from '../components/Table/TableHeadingColumn';
import TableActions from '../components/Table/TableActions';
import TableDataCell from '../components/Table/TableDataCell';

import { Sale } from '../types/Api';
import { ToastAlertOptions as options } from '../data/ToastAlert';

const Home: FC<RouteComponentProps> = props => {

    const { fetchProducts } = useContext(ProductContext);
    const { sales, setEditingSale, deleteSale } = useContext(SaleContext);

    const openEditForm = (data: Sale | null) => {
        setEditingSale(data);
        props.history.push('/ventas/nuevo');
    }

    const deleteSaleHandler = async (id: number) => {
        const confirmationAlert = await Swal.fire({
            title: 'Eliminar venta',
            icon: 'question',
            text: '¿Estás seguro de que quieres eliminar esta venta?',
            confirmButtonText: 'Si, borrar',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'No, cancelar',
            cancelButtonColor: 'red',
        });

        if (confirmationAlert.value === confirmationAlert.isConfirmed) {
            const { error, message } = await deleteSale(id);
            if (error)
                toast.error(message, options);
            else {
                toast.success(message, options);
                fetchProducts();
            }
        }
    };

    return (
        <PageContainer>
            <ActionsContainer>
                <Link
                    to="/ventas/nuevo"
                    className="block w-full p-3 text-center text-white bg-green-500 rounded hover:bg-green-700 lg:w-44"
                >Agregar nueva venta</Link>

                <Link
                    to="/ventas/resumen"
                    className="block w-full p-3 text-center text-white bg-blue-500 rounded hover:bg-blue-700 lg:w-52"
                >Ver resumen de ventas</Link>
            </ActionsContainer>
            <Table>
                <TableHeading>
                    <TableHeadingColumn className="lg:w-14">Producto</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-14">Marca</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-14">Cantidad</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-14">Precio c/u</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-14">Total</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-28">Acciones</TableHeadingColumn>
                </TableHeading>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.sale_id}>
                            <TableDataCell> {sale.product.classification} </TableDataCell>
                            <TableDataCell> {sale.product.brand} </TableDataCell>
                            <TableDataCell> {sale.amount} </TableDataCell>
                            <TableDataCell> {sale.product.public_price} </TableDataCell>
                            <TableDataCell> {sale.total} </TableDataCell>
                            <TableActions
                                onEditClick={ () => openEditForm(sale) }
                                onDeleteClick={ () => deleteSaleHandler(sale.sale_id) }
                            />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PageContainer>
    );
};

export default Home;
