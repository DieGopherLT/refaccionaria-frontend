import React, { FC, useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import SaleContext from '../../context/Sales/SaleContext';
import ProductContext from '../../context/Product/ProductContext';

import useForm from '../../hooks/useForm';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';

import { Option } from '../../types/Form';
import { SaleDTO } from '../../types/Api';
import { ToastAlertOptions as options } from '../../data/ToastAlert';

const SaleForm: FC<RouteComponentProps> = props => {

    const { editingSale, fetchSales, postSale, setEditingSale, updateSale } = useContext(SaleContext);
    const { products, fetchProducts } = useContext(ProductContext);

    const { product_id, amount, handleChange } = useForm({
        product_id: editingSale?.product.product_id || '',
        amount: editingSale?.amount || 0
    });
    const [price, setPrice] = useState<number>(editingSale?.product.price || 0);

    useEffect(() => {
        if (products.length === 0) {
            Swal.fire('No hay productos', 'Agrega un producto primero antes de realizar una venta.', 'warning')
                .then(() => props.history.push('/productos'))
        }
    }, []);

    useEffect(() => {
        return () => {
            if (editingSale !== null)
                setEditingSale(null);
        }
    }, [])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sale: SaleDTO = {
            product_id: parseInt(product_id.toString()),
            amount: parseInt(amount.toString()),
            total: amount * price
        }

        if (editingSale === null) {
            postSale(sale)
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return;
                    }
                    else
                        toast.success(message, options);
                });
        } else {
            updateSale(sale, editingSale)
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return;
                    }
                    else
                        toast.success(message, options);
                });
        }
        fetchSales();
        fetchProducts();
        props.history.push('/');
    }

    const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event;
        if (value !== '') {
            const productPrice = products.filter(product => product.product_id.toString() === value)[0].price;
            setPrice(productPrice);
        }
        handleChange(event, 'product_id');
    }

    const productOptions: Option[] = products.map(product => {
        return { value: product.product_id, label: product.name }
    });

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-center text-2xl font-bold">
                        Registrar una nueva venta
                    </h2>
                    <Select
                        label="Producto"
                        options={ productOptions }
                        value={ product_id }
                        onChange={ handleProductChange }
                    />
                    <Input
                        type="number"
                        label="Cantidad a vender"
                        id="amount"
                        value={ amount.toString() }
                        onChange={ event => handleChange(event, 'amount') }
                    />
                    <p className={ `${product_id !== '' ? 'block' : 'hidden'} text-lg` }>
                        <span className="font-bold">Total a pagar:</span> { amount * price }
                    </p>
                    <div className="w-full md:flex md:justify-center">
                        <Button
                            color="blue"
                            type="submit"
                            text="Registrar venta"
                            className="md:w-44"
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default SaleForm;
