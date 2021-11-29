import React, { FC, useState, useContext, FormEvent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import useForm from '../../hooks/useForm';

import DeliveryContext from '../../context/Delivery/DeliveryContext';
import ProductContext from '../../context/Product/ProductContext';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';
import GoBack from '../../components/UI/GoBack';

import { Option } from '../../types/Form';
import { DeliveryDTO } from '../../types/Api';
import { ToastAlertOptions as options } from '../../data/ToastAlert';
import Swal from 'sweetalert2';

const DeliveryForm: FC<RouteComponentProps> = props => {

    const { fetchDeliveries, postDelivery } = useContext(DeliveryContext);
    const { products } = useContext(ProductContext);

    const { formData, handleChange } = useForm({
        productClassification: '',
        providerId: '',
        amount: '',
    });

    const [category, setCategory] = useState<string>('');
    const [orderPrice, setOrderPrice] = useState<number>(0);

    useEffect(() => {
        if (products.length === 0) {
            Swal.fire('No hay productos', 'No se pueden realizar ordenes sin productos que ordenar.', 'warning')
                .then(() => props.history.push('/entregas'))
        }
    // eslint-disable-next-line
    }, []);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const productId = products.filter(product => {
            return product.classification.toLowerCase() === formData.productClassification.toLowerCase();
        })[0].product_id;

        const delivery: DeliveryDTO = {
            product_id: productId,
            provider_id: parseInt(formData.providerId),
            delivery_date: new Date(),
            amount: parseInt(formData.amount)
        }

        postDelivery(delivery)
            .then(({ error, message }) => {
                if (error) {
                    toast.error(message, options);
                    return;
                }
                fetchDeliveries();
                toast.success(message, options);
                props.history.push('/entregas');
            })
    }

    const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const productsWithClassification = products.filter(product => product.classification === event.target.value);
        if (productsWithClassification.length === 0) {
            setCategory('');
            setOrderPrice(0);
        }
        else
            setCategory(productsWithClassification[0].category.name);
        handleChange(event, 'productClassification');
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseInt(event.target.value);
        const productsWithSelectedProvider = products.filter(product => product.provider.provider_id.toString() === formData.providerId);

        if (productsWithSelectedProvider.length === 0)
            setOrderPrice(0)
        else
            setOrderPrice(amount * productsWithSelectedProvider[0].provider_price);

        handleChange(event, 'amount');
    }

    const productOptions: Option[] = products.map(product => {
        const opt: Option = { value: product.classification, label: product.classification };
        return opt;
    });

    const providerOptions: Option[] = products.filter(product => product.classification.toLowerCase() === formData.productClassification.toLowerCase())
        .map(product => {
            const opt: Option = { value: product.provider.provider_id, label: product.provider.name };
            return opt;
        })

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <GoBack to="/entregas" />
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-2xl font-bold text-center">Realizar nueva orden</h2>
                    <div className="flex flex-col justify-between md:flex-row">
                        <Select
                            label="Producto"
                            value={ formData.productClassification }
                            onChange={ handleProductChange }
                            options={ productOptions }
                        />
                        <Select
                            label="Proveedor"
                            value={ formData.providerId }
                            onChange={ event => handleChange(event, 'providerId') }
                            options={ providerOptions }
                        />
                    </div>
                    <div className="w-full">
                        <p className={ `${category ? 'block' : 'hidden'} font-bold text-lg` }>
                            Categoria del producto: <span className="font-normal">{ category }</span>
                        </p>
                    </div>
                    <Input
                        id="amount"
                        type="number"
                        label="Cantidad"
                        placeholder="Cantidad de productos a ordenar"
                        value={ formData.amount.toString() }
                        onChange={ handleAmountChange }
                    />
                    <div className="w-full">
                        <p className={ `${orderPrice ? 'block' : 'hidden'} font-bold text-lg` }>
                            Precio de la orden: <span className="font-normal">{ orderPrice }</span>
                        </p>
                    </div>
                    <div className="w-full mt-5 md:flex md:justify-center">
                        <Button
                            className="md:w-44"
                            color="blue"
                            type="submit"
                            text="Registrar orden"
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default DeliveryForm;
