import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const TestISolved = Loadable(lazy(() => import('./TestISolved')));
const AllTests = Loadable(lazy(() => import('./AllTests')));
const TestISolvedShow = Loadable(lazy(() => import('./TestISolvedShow')));
const TestSolve = Loadable(lazy(() => import('./TestSolve')));

const teacherRoutes = [
    { path: '/testısolved', element: <TestISolved /> },
    { path: '/alltests', element: <AllTests /> },
    { path: '/testısolvedshow/:id', element: <TestISolvedShow /> },
    { path: '/test/:testname/:id', element: <TestSolve /> }
];

export default teacherRoutes;