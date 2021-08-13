import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'landing',
        title    : 'Landing',
        translate: 'LANDING',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/landing',
    },
    {
        id       : 'style',
        title    : 'Style',
        translate: 'STYLE',
        type     : 'item',
        icon     : 'style',
        url      : '/style',
    },
    {
        id       : 'color',
        title    : 'Color',
        translate: 'COLOR',
        type     : 'item',
        icon     : 'color_lens',
        url      : '/color',
    },
    {
        id       : 'size',
        title    : 'Size',
        translate: 'SIZE',
        type     : 'item',
        icon     : 'photo_size_select_large',
        url      : '/size',
    },
    {
        id       : 'order',
        title    : 'Order',
        translate: 'ORDER',
        type     : 'item',
        icon     : 'photo_size_select_large',
        url      : '/order',
    }
];
