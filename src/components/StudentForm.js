import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import { toggleStudentForm } from "../store/slices/modal";
import { addStudent } from "../store/slices/student";

const StudentForm = () => {
  const { isStudentFormVisible } = useSelector((state) => state.modal);
  const { addStudentLoading } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("dob", data.dob);
    formData.append("percentage", data.percentage);

    dispatch(addStudent(formData));

    reset({
      file: [],
      firstName: "",
      lastName: "",
      dob: "",
      percentage: "",
    });
  };

  const handleClose = () => {
    dispatch(toggleStudentForm());
  };

  return (
    <Modal show={isStudentFormVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="12" lg="6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Please add your first name",
                    },
                  })}
                />

                {errors?.firstName && (
                  <Form.Text type="invalid">
                    {errors?.firstName?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col sm="12" lg="6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Please add your last name",
                    },
                  })}
                />

                {errors?.lastName && (
                  <Form.Text type="invalid">
                    {errors?.lastName?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm="12" lg="6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date of birth"
                  {...register("dob", {
                    required: {
                      value: true,
                      message: "Please add your dob",
                    },
                  })}
                />
                {errors?.dob && (
                  <Form.Text type="invalid">{errors?.dob?.message}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col sm="12" lg="6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Percentage</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter percentage"
                  {...register("percentage", {
                    required: {
                      value: true,
                      message: "Please add your percentage",
                    },

                    min: {
                      value: 1,
                      message: "Cannot be 0",
                    },

                    max: {
                      value: 100,
                      message: "Cannot be more than 100",
                    },
                  })}
                />
                {errors?.percentage && (
                  <Form.Text type="invalid">
                    {errors?.percentage?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload Profile Photo"
              {...register("file", {
                required: {
                  value: true,
                  message: "Please add your profile photo",
                },
              })}
            />

            {errors?.file && (
              <Form.Text type="invalid">{errors?.file?.message}</Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" disabled={addStudentLoading}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentForm;
