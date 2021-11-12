import React, { FC, useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

const SaleForm: FC<RouteComponentProps> = props => {

    const { editingSale, postSale, setEditingSale } = useContext(SaleContext);
    const { products } = useContext(ProductContext);

    const { product_id, amount, handleChange } = useForm({
        product_id: editingSale?.product.product_id || '',
        amount: editingSale?.amount || 0
    });
    const [price, setPrice] = useState<number>(editingSale?.product.price || 0);

    useEffect(() => {
        return () => {
            if (editingSale !== null)
                setEditingSale(null);
        }
    }, [])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postSale({ product_id: parseInt(product_id.toString()), amount: parseInt(amount.toString()), total: amount * price })
            .then(() => props.history.push('/'))
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
