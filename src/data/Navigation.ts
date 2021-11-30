import { NavigationItemData } from '../interfaces/Navigation';

import {
    FaDollarSign,
    FaShoppingCart,
    FaTruckLoading,
    FaTruckMoving,
    FaUserAlt
} from 'react-icons/fa';

const props = {
    color: '#ffffff',
}

export const navData: NavigationItemData[] = [
    {
        href: '/',
        label: 'Ventas',
        Icon: FaDollarSign,
        props
    },
    {
        href: '/clientes',
        label: 'Clientes',
        Icon: FaUserAlt,
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
