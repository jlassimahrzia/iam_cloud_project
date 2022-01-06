import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Navigation',
        items: ['roles','permissions','users'],
    }
];

export const sideNavItems: SideNavItems = {
    // dashboard: {
    //     icon: 'desktop',
    //     text: 'Dashboard',
    //     authority: 'ROLE_ADMIN',
    //     link: '/dashboard',
    // },
    roles: {
        icon: 'user-tag',
        text: 'Roles',
        authority: 'ROLE_ADMIN',
        link: '/auth/roles',
    },
    permissions: {
        icon: 'key',
        text: 'Permissions',
        authority: 'ROLE_ADMIN',
        link: '/auth/permissions',
    },
    users: {
        icon: 'user',
        text: 'Users',
        authority: 'ROLE_ADMIN',
        link: '/auth/users',
    },

};
