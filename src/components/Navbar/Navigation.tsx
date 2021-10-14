import React, { FC } from 'react';

import NavItem from './NavItem';

import { NavigationItemData } from '../../interfaces/Navigation';

interface NavigationProps {
    data: NavigationItemData[];
}

const Navigation: FC<NavigationProps> = ({ data }) => {
    return (
        <nav className="flex flex-wrap items-center justify-around h-full md:gap-1 md:p-10 md:justify-start md:flex-col">
            <h2 className="hidden mb-4 text-3xl text-white md:block">Refaccionaria</h2>
            { data.map(item => (
                <NavItem data={ item }/>
            )) }
        </nav>
    );
};

export default Navigation;
