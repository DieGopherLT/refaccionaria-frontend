import React, { FC } from 'react';

import NavItem from './NavItem';

import { NavigationItemData } from '../../interfaces/Navigation';

interface NavigationProps {
    data: NavigationItemData[];
}

const Navigation: FC<NavigationProps> = ({ data }) => {
    return (
        <nav className="flex items-center justify-around h-full gap-4 md:p-10 md:justify-center md:flex-col">
            { data.map(item => (
                <NavItem data={ item }/>
            )) }
        </nav>
    );
};

export default Navigation;
