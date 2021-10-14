import { NavigationItemData } from '../interfaces/Navigation';

import {
    FaHome,
    FaShoppingCart,
    FaTruckLoading,
    FaTruckMoving
} from 'react-icons/fa';

const props = {
    color: '#ffffff',
}

export const navData: NavigationItemData[] = [
    {
        href: '/',
        label: 'Inicio',
        Icon: FaHome,
        props
    }, 
    {
        href: '/productos',
        label: 'Productos',
        Icon: FaShoppingCart,
        props
    },
    {
        href: '/proveedores',
        label: 'Proveedores',
        Icon: FaTruckMoving,
        props
    },
    {
        href: '/entregas',
        label: 'Entregas',
        Icon: FaTruckLoading,
        props
    }
]
