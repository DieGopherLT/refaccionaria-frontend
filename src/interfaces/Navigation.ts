import { IconType, IconBaseProps } from 'react-icons';

export interface NavigationItemData {
    href: string;
    label: string;
    Icon: IconType;
    props: IconBaseProps;
}

