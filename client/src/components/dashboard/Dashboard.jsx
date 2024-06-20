import React from "react";
import useAuth from "app/hooks/useAuth";

import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashbord = () => {
  const { user } = useAuth();
  return user.role == 1 ? (
    <AdminDashboard />
  ) : user.role == 2 ? (
    <TeacherDashboard />
  ) : user.role == 3 ? (
    <StudentDashboard />
  ) : (
    <div>Not Found</div>
  );
};

export default Dashbord;
