import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { NavigationItemData } from '../../interfaces/Navigation';

interface NavItemProps {
    data: NavigationItemData;
}

const NavItem: FC<NavItemProps> = ({ data }) => {
    const { Icon, props, href, label } = data;

    return (
        <div className="md:p-2 lg:transition-colors lg:duration-300 lg:rounded lg:hover:bg-yellow-500 lg:w-full">
            <Link to={ href } className="flex items-center lg:gap-4">
                <Icon { ...props } className="w-8 h-auto" />
                <span className="hidden text-lg text-white lg:inline">{ label }</span>
            </Link>
        </div>
    );
};

export default NavItem;
