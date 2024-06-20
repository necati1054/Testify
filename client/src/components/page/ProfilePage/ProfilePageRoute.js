import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const ProfilePageRoute = Loadable(lazy(() => import('./UserProfile')));

const sessionRoutes = [
    { path: '/profile', element: <ProfilePageRoute /> }
];

export default sessionRoutes;