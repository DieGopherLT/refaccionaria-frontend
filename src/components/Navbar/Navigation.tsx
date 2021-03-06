import React, { FC } from 'react';

import NavItem from './NavItem';

import { NavigationItemData } from '../../interfaces/Navigation';

interface NavigationProps {
    data: NavigationItemData[];
}

const Navigation: FC<NavigationProps> = ({ data }) => {
    return (
        <nav className="flex flex-wrap items-center justify-around h-full lg:gap-1 lg:p-10 lg:justify-start lg:flex-col">
            <h2 className="hidden mb-4 text-3xl text-white lg:block">Refaccionaria</h2>
            { data.map(item => (
                <NavItem key={ item.href } data={ item }/>
            )) }
        </nav>
    );
};

export default Navigation;
