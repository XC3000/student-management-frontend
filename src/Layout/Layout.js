import React from "react";
import { Container } from "react-bootstrap";
import { HomeNavbar, ConfirmDeleteStudent } from "../components";

import StudentForm from "../components/StudentForm";
import UpdateStudentForm from "../components/UpdateStudentForm";

const Layout = ({ children }) => {
  return (
    <Container className="p-3">
      <HomeNavbar />

      {children}
      <StudentForm />
      <ConfirmDeleteStudent />
      <UpdateStudentForm />
    </Container>
  );
};

export default Layout;
