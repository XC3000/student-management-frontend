import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleConfirmDeleteStudentModal } from "../store/slices/modal";
import { deleteStudent, removeStudentToDelete } from "../store/slices/student";

const ConfirmDeleteStudent = () => {
  const dispatch = useDispatch();
  const { isConfirmDeleteStudentModalVisible } = useSelector(
    (state) => state.modal
  );

  const { studentToDelete, studentDeletingLoading } = useSelector(
    (state) => state.students
  );

  const hideModal = () => {
    dispatch(toggleConfirmDeleteStudentModal());
    dispatch(removeStudentToDelete());
  };

  const onConfirmDelete = () => {
    dispatch(deleteStudent(studentToDelete._id));
    dispatch(toggleConfirmDeleteStudentModal());
  };

  return (
    <Modal
      show={isConfirmDeleteStudentModalVisible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideModal}
    >
      <Modal.Body>
        <p className="mt-3">
          Are you sure you want to delete the Student?
          <br />
          {studentToDelete.firstName + " " + studentToDelete.lastName}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="info"
          disabled={studentDeletingLoading}
          onClick={hideModal}
        >
          Close
        </Button>
        <Button
          variant="danger"
          disabled={studentDeletingLoading}
          onClick={onConfirmDelete}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteStudent;
