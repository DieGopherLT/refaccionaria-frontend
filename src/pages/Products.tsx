import React, { FC, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ProductContext from '../context/Product/ProductContext';

import PageContainer from '../components/UI/PageContainer';
import ActionsContainer from '../components/UI/ActionsContainer';
import Table from '../components/Table/Table';
import TableHeading from '../components/Table/TableHeading';
import TableHeadingColumn from '../components/Table/TableHeadingColumn';
import TableActions from '../components/Table/TableActions';
import TableDataCell from '../components/Table/TableDataCell';

import { Product } from '../types/Api';
import { ToastAlertOptions as options } from '../data/ToastAlert';

interface ProductsProps extends RouteComponentProps {
}

const Products: FC<ProductsProps> = props => {

    const { products, setEditingProduct, deleteProduct } = useContext(ProductContext);

    const deleteProductRequest = async (id: number) => {
        const promptResponse = await Swal.fire({
            title: 'Eliminar producto',
            icon: 'question',
            text: '¿Estás seguro de que quieres eliminar este producto?',
            confirmButtonText: 'Si, borrar',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'No, cancelar',
            cancelButtonColor: 'red',
        });

        if(promptResponse.value === promptResponse.isConfirmed) {
            const response = await deleteProduct(id);
            if(response.error) {
                toast.error(response.message, options);
            }
            else {
                toast.success(response.message, options);
            }
        }
    };

    const editProduct = (product: Product) => {
        setEditingProduct(product);
        props.history.push('/productos/nuevo');
    };

    return (
        <PageContainer>
            <ActionsContainer>
                <Link
                    to="/productos/nuevo"
                    className="block w-full p-3 text-center text-white bg-green-500 rounded hover:bg-green-700 lg:w-48"
                >Crear producto nuevo</Link>
            </ActionsContainer>
            <Table>
                <TableHeading>
                    <TableHeadingColumn className="lg:w-9">ID</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-12">Categoría</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-32">Clasificación</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-8">Precio</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-8">Precio proveedor</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-8">Cantidad</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-28">Acciones</TableHeadingColumn>
                </TableHeading>
                <tbody>
                { products.map(product => (
                    <tr key={ `${ product.product_id }-${ product.classification }` }>
                        <TableDataCell> { product.product_id } </TableDataCell>
                        <TableDataCell> { product.category.name } </TableDataCell>
                        <TableDataCell> { product.classification } </TableDataCell>
                        <TableDataCell> { product.public_price } </TableDataCell>
                        <TableDataCell> { product.provider_price } </TableDataCell>
                        <TableDataCell> { product.amount || 0 } </TableDataCell>
                        <TableActions
                            onEditClick={ () => editProduct(product) }
                            onDeleteClick={ () => deleteProductRequest(product.product_id) }
                        />
                    </tr>
                )) }
                </tbody>
            </Table>
        </PageContainer>
    );
};

export default Products;
