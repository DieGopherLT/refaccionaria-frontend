import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProductContext from '../context/Product/ProductContext';
import DeliveryContext from '../context/Delivery/DeliveryContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';
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
            <Wrapper className="max-w-5xl mt-5">
                <Link
                    to="/entregas/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-52"
                >Hacer una nueva orden</Link>
            </Wrapper>
            <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
                <table className="w-full border-collapse lg:table-fixed">
                    <thead>
                    <tr>
                        <th className="p-1 border border-blue-600 lg:w-16">Nombre</th>
                        <th className="p-1 border border-blue-600 lg:w-16">Marca</th>
                        <th className="p-1 border border-blue-600 lg:w-12">Proveedor</th>
                        <th className="p-1 border border-blue-600 lg:w-24">Correo</th>
                        <th className="p-1 border border-blue-600 lg:w-12">Entrega en</th>
                        <th className="p-1 border border-blue-600 lg:w-12">Cantidad</th>
                        <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    { deliveries.map((delivery, index) => (
                        <tr key={ index }>
                            <td className="p-1 border border-blue-600">{ delivery.product.name }</td>
                            <td className="p-1 border border-blue-600">{ delivery.product.brand }</td>
                            <td className="p-1 border border-blue-600">{ delivery.provider.name }</td>
                            <td className="p-1 border border-blue-600">{ delivery.provider.email }</td>
                            <td className="p-1 border border-blue-600">{ delivery.delivery_date.split('T')[0] }</td>
                            <td className="p-1 border border-blue-600">{ delivery.amount }</td>
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
                </table>
            </Wrapper>
        </PageContainer>
    );
};

export default Deliveries;
