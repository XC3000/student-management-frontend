import moment from "moment";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../config";
import {
  toggleConfirmDeleteStudentModal,
  toggleStudentUpdateFrom,
} from "../../store/slices/modal";
import {
  setSelectedStudent,
  setStudentToDelete,
} from "../../store/slices/student";

import "./StudentCard.scss";

const StudentCard = ({ student }) => {
  const dispatch = useDispatch();

  const handleStudentDelete = (student) => {
    dispatch(setStudentToDelete(student));
    dispatch(toggleConfirmDeleteStudentModal());
  };

  const handleStudentUpdate = (student) => {
    dispatch(setSelectedStudent(student));
    dispatch(toggleStudentUpdateFrom());
  };

  return (
    <Card style={{ width: "100%" }}>
      <Card.Img variant="top" src={BASE_URL + "/" + student.profilePhoto} />
      <Card.Body>
        {/* <Card.Title>{student.firstName + " " + student.lastName}</Card.Title> */}

        <p className="mb-1">First Name: {student.firstName}</p>
        <p className="mb-1">Last Name: {student.lastName}</p>
        <p className="mb-1">Percentage: {student.percentage}</p>
        <p className="mb-1">
          Date of Birth: {moment(student.dob).format("MMMM Do YYYY")}{" "}
        </p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => handleStudentUpdate(student)}>
          View/Update
        </Button>
        <Button variant="danger" onClick={() => handleStudentDelete(student)}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default StudentCard;
