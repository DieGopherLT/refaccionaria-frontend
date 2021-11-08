import { ChangeEvent, useState } from 'react';

const useForm = <T extends Object>(initialState: T) => {

    const [formData, setFormData] = useState<T>(initialState);

    type Input = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    const handleChange = (e: ChangeEvent<Input>, name: keyof T) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: e.target.value
            }
        })
    }

    const resetForm = () => setFormData(initialState);

    return {
        ...formData,
        formData,
        handleChange,
        resetForm
    }
}

export default useForm;
