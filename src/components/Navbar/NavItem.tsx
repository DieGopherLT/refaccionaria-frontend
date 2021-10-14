import React, { FC } from 'react';
import { NavigationItemData } from '../../interfaces/Navigation';

interface NavItemProps {
    data: NavigationItemData;
}

const NavItem: FC<NavItemProps> = ({ data }) => {
    const { Icon, props, href, label } = data;

    return (
        <a href={ href } className="flex items-center md:w-full md:gap-4">
            <Icon { ...props } className="md:flex-icon" />
            <span className="hidden text-lg text-white md:inline">{ label }</span>
        </a>
    );
};

export default NavItem;
