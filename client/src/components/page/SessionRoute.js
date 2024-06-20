import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

// const NotFound = Loadable(lazy(() => import('./NotFound')));
const Login = Loadable(lazy(() => import('./Login')));
const Register = Loadable(lazy(() => import('./Register')));
const ResetPassword = Loadable(lazy(() => import('./ResetPassword')));
const NewPassword = Loadable(lazy(() => import('./NewPassword')));

const sessionRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/resetpassword', element: <ResetPassword /> },
    { path: '/new-password/:code', element: <NewPassword /> }
    // { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;