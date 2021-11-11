import React, { FC, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';

const SaleForm: FC<RouteComponentProps> = props => {

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit } >

                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default SaleForm;
