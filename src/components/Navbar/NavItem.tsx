import React, { FC } from 'react';
import { NavigationItemData } from '../../interfaces/Navigation';

interface NavItemProps {
    data: NavigationItemData;
}

const NavItem: FC<NavItemProps> = ({ data }) => {
    const { Icon, props, href, label } = data;

    return (
        <div className="md:p-2 md:transition-colors md:duration-300 md:rounded md:hover:bg-yellow-500 md:w-full">
            <a href={ href } className="flex items-center md:gap-4">
                <Icon { ...props } className="w-8 h-auto" />
                <span className="hidden text-lg text-white md:inline">{ label }</span>
            </a>
        </div>
    );
};

export default NavItem;
