import { NavigationItemData } from '../interfaces/Navigation';

import {
    FaHome
} from 'react-icons/fa';

export const navData: NavigationItemData[] = [
    {
        href: '/',
        label: 'Inicio',
        Icon: FaHome,
        props: {
            color: '#ffffff',
            size: 30
        }
    }
]
