import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const TestICreated = Loadable(lazy(() => import('./TestICreated')));
const CreateTest = Loadable(lazy(() => import('./CreateTest')));
const LookTest = Loadable(lazy(() => import('./LookTest')));
const TestSolvers = Loadable(lazy(() => import('./TestSolvers')));
const TestSolver = Loadable(lazy(() => import('./TestSolver')));

const teacherRoutes = [
    { path: '/testıcreated', element: <TestICreated /> },
    { path: '/testıcreated/createtest', element: <CreateTest /> },
    { path: '/testıcreated/looktest/:id', element: <LookTest /> },
    { path: '/testsolvers/:testid', element: <TestSolvers /> },
    { path: '/testsolver/looktest/:id', element: <TestSolver /> }
];

export default teacherRoutes;