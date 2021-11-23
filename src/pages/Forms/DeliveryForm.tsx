import React, { FC, useState, useContext, FormEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
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
        productName: '',
        providerId: '',
        amount: '',
    });

    const [date, setDate] = useState<any>(new Date());

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
            return product.name.toLowerCase() === formData.productName.toLowerCase();
        })[0].product_id;

        const delivery: DeliveryDTO = {
            product_id: productId,
            provider_id: parseInt(formData.providerId),
            delivery_date: date,
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

    const productOptions: Option[] = products.map(product => {
        const opt: Option = { value: product.name, label: product.name };
        return opt;
    });

    const providerOptions: Option[] = products.filter(product => product.name.toLowerCase() === formData.productName.toLowerCase())
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
                            value={ formData.productName }
                            onChange={ event => handleChange(event, 'productName') }
                            options={ productOptions }
                        />
                        <Select
                            label="Proveedor"
                            value={ formData.providerId }
                            onChange={ event => handleChange(event, 'providerId') }
                            options={ providerOptions }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="date">Fecha</label>
                        <DatePicker
                            className="w-full p-1 pl-2 border border-black rounded md:w-auto"
                            id="date"
                            dateFormat="dd/MM/yyyy"
                            dateFormatCalendar="MMM yyyy"
                            minDate={ new Date() }
                            selected={ date }
                            onChange={ date => setDate(date) }
                        />
                    </div>
                    <Input
                        id="amount"
                        type="number"
                        label="Cantidad"
                        placeholder="Cantidad de productos a ordenar"
                        value={ formData.amount.toString() }
                        onChange={ event => handleChange(event, 'amount') }
                    />
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
