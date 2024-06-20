import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import HomePage from "components/page/HomePage";

import dashboardRoutes from "components/dashboard/DashboardRoutes";
import sessionRoutes from "components/page/SessionRoute";
import adminRoutes from "components/admin/AdminRoute";
import teacherRoutes from "components/teacher/TeacherRoute";
import studentRoutes from "components/student/StudentRoute";
import profilepageroute from "components/page/ProfilePage/ProfilePageRoute";

import NotFound from "components/page/NotFound";

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      // dashboard route

      ...dashboardRoutes,
      ...adminRoutes,
      ...teacherRoutes,
      ...studentRoutes,
      ...profilepageroute
    ]
  },
  ...sessionRoutes,

  // session pages route

  { path: "/session/404", element: <NotFound /> },
  // { path: "/session/signin", element: <JwtLogin /> },


  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
