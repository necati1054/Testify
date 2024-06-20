import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Settings = Loadable(lazy(() => import('./Settings')));

const adminRoutes = [
    { path: '/settings', element: <Settings /> },
];

export default adminRoutes;