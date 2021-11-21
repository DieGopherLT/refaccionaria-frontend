import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface GoBackProps {
    to: string;
}

const GoBack: FC<GoBackProps> = ({ to }) => {
    return (
        <Link 
            to={ to }
            className="flex items-center gap-2 h-7"
        >
            <FaArrowLeft size={ 20 } />
            <span className="text-lg">Volver atrás</span>
        </Link>
    );
};

export default GoBack;