import React, { FC, useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import SaleContext from '../../context/Sales/SaleContext';
import ProductContext from '../../context/Product/ProductContext';
import ClientContext from '../../context/Client/ClientContext';

import useForm from '../../hooks/useForm';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';
import GoBack from '../../components/UI/GoBack';

import { Option } from '../../types/Form';
import { SaleDTO } from '../../types/Api';
import { ToastAlertOptions as options } from '../../data/ToastAlert';

const SaleForm: FC<RouteComponentProps> = props => {

    const { editingSale, fetchSales, postSale, setEditingSale, updateSale } = useContext(SaleContext);
    const { products, fetchProducts } = useContext(ProductContext);
    const { clients } = useContext(ClientContext);

    const { product_id, client_id, amount, handleChange } = useForm({
        product_id: editingSale?.product.product_id || '',
        amount: editingSale?.amount || 0,
        client_id: editingSale?.client_id || ''
    });
    const [price, setPrice] = useState<number>(editingSale?.product.price || 0);

    useEffect(() => {
        if (products.length === 0 || clients.length === 0) {
            Swal.fire('No se puede realizar una venta', 'Tiene que existir al menos un cliente y un producto antes de realizar una venta.', 'warning')
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
            client_id: parseInt(client_id as string),
            amount: parseInt(amount.toString()),
            total: amount * price * 1.16,
            subtotal: amount * price
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
                    fetchSales();
                    fetchProducts();
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
                        fetchSales();
                        fetchProducts();
                });
        }
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

    const clientOpcions: Option[] = clients.map(client => {
        return { value: client.client_id, label: client.name }
    });

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <GoBack to="/" />
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-2xl font-bold text-center">
                        { editingSale ? 'Modificar venta' : 'Registrar una nueva venta' }
                    </h2>
                    <Select
                        label="Producto"
                        options={ productOptions }
                        value={ product_id }
                        onChange={ handleProductChange }
                    />
                    {
                        editingSale === null &&
                        <Select 
                            label="Cliente"
                            options={ clientOpcions }
                            value={ client_id }
                            onChange={ event => handleChange(event, 'client_id') }
                        />
                    }
                    <Input
                        type="number"
                        label="Cantidad a vender"
                        id="amount"
                        value={ amount.toString() }
                        onChange={ event => handleChange(event, 'amount') }
                    />
                    <p className={ `${product_id !== '' ? 'block' : 'hidden'} text-lg` }>
                        <span className="font-bold">Subtotal:</span> { amount * price }
                    </p>
                    <p className={ `${product_id !== '' ? 'block' : 'hidden'} text-lg` }>
                        <span className="font-bold">Total a pagar:</span> { (amount * price * 1.16).toFixed(2) }
                    </p>
                    <div className="w-full md:flex md:justify-center">
                        <Button
                            color="blue"
                            type="submit"
                            className="md:w-44"
                            text={ editingSale ? 'Guardar cambios' : 'Registrar venta' }
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default SaleForm;
