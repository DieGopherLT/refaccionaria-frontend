import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ProductContext from '../context/Product/ProductContext';
import SaleContext from '../context/Sales/SaleContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';
import Button from '../components/UI/Button';

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
            <Wrapper className="flex justify-between max-w-5xl gap-2 mt-5 md:justify-start">
                <Link
                    to="/ventas/nuevo"
                    className="block w-full p-3 text-center text-white bg-green-500 rounded hover:bg-green-700 lg:w-44"
                >Agregar nueva venta</Link>

                <Link
                    to="/ventas/resumen"
                    className="block w-full p-3 text-center text-white bg-blue-500 rounded hover:bg-blue-700 lg:w-52"
                >Ver resumen de ventas</Link>
            </Wrapper>
            <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
                <table className="w-full border-collapse lg:table-fixed">
                    <thead>
                        <tr>
                            <th className="p-1 border border-blue-600 lg:w-14">Producto</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Marca</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Cantidad</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Precio c/u</th>
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
                                                onClick={ () => deleteSaleHandler(sale.sale_id) }
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
