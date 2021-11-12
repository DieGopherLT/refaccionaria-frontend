import React, { FC, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';

import ProductContext from '../context/Product/ProductContext';
import Button from '../components/UI/Button';

import { Product } from '../types/Api';

interface ProductsProps extends RouteComponentProps{}

const Products: FC<ProductsProps> = props => {

    const { products, setEditingProduct, deleteProduct } = useContext(ProductContext);

    const deleteProductRequest = async (id: number) => {
        await deleteProduct(id);
    }

    const editProduct = (product: Product) => {
        setEditingProduct(product);
        props.history.push('/productos/nuevo');
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5">
                <Link
                    to="/productos/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-48"
                >Crear producto nuevo</Link>
            </Wrapper>
            <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
                <table className="w-full border-collapse lg:table-fixed">
                    <thead>
                        <tr>
                            <th className="p-1 border border-blue-600 lg:w-9">ID</th>
                            <th className="p-1 border border-blue-600 lg:w-12">Nombre</th>
                            <th className="p-1 border border-blue-600 lg:w-32">Descripcion</th>
                            <th className="p-1 border border-blue-600 lg:w-8">Precio</th>
                            <th className="p-1 border border-blue-600 lg:w-8">Cantidad</th>
                            <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map((product, index) => (
                            <tr key={ product.product_id + index }>
                                <td className="p-1 border border-blue-600">{ product.product_id }</td>
                                <td className="p-1 border border-blue-600">{ product.name }</td>
                                <td className="p-1 border border-blue-600">{ product.description }</td>
                                <td className="p-1 border border-blue-600">{ product.price }</td>
                                <td className="p-1 border border-blue-600">{ product.amount }</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="yellow"
                                                type="button"
                                                text="Editar"
                                                onClick={ () => editProduct(product) }
                                            />
                                        </div>
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="red"
                                                type="button"
                                                text="Borrar"
                                                onClick={ () => deleteProductRequest(product.product_id) }
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

export default Products;
