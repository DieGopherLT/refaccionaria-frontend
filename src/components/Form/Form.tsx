import React, { FC, FormEvent } from 'react';

interface FormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ onSubmit, children }) => {
    return (
        <form
            onSubmit={ onSubmit }
            className="p-5 rounded-lg shadow-xl"
        >
            { children }
        </form>
    );
};

export default Form;
