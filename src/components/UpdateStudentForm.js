import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import moment from "moment";

import { toggleStudentUpdateFrom } from "../store/slices/modal";
import { updateStudent } from "../store/slices/student";
import { BASE_URL } from "../config";

const UpdateStudentForm = () => {
  const { isStudentUpdateFromVisible } = useSelector((state) => state.modal);
  const { selectedStudent } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (selectedStudent._id) {
      setValue("firstName", selectedStudent.firstName);
      setValue("lastName", selectedStudent.lastName);
      setValue("dob", moment(selectedStudent.dob).format("YYYY-MM-DD"));
      setValue("percentage", selectedStudent.percentage);
      setValue("file", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent]);

  const onSubmit = (data) => {
    // console.log(data);

    // const { firstName } = data;
    // console.log(firstName);

    // const form = new FormData();
    // const formData = form;

    // form

    // let 1formData = new FormData(document.querySelector("form"));
    // if (data.file && data.file.length > 0) {
    //   formData.append("file", data.file[0]);
    // }

    // formData.append("firstName", firstName);

    // console.log(data.file[0]);

    let formData = {};

    if (data.file) {
      formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append("_id", selectedStudent._id);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("dob", data.dob);
      formData.append("percentage", data.percentage);

      console.log(formData.get("_id"));

      dispatch(updateStudent(formData));

      //   formData = {
      //     ...selectedStudent,
      //     file: data.file[0],
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     dob: data.dob,
      //     percentage: data.percentage,
      //   };
    } else {
      formData = {
        ...selectedStudent,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        percentage: data.percentage,
      };
      dispatch(updateStudent(formData));
    }

    // console.log(formData);

    // reset({
    //   file: [],
    //   firstName: "",
    //   lastName: "",
    //   dob: "",
    //   percentage: "",
    // });
  };

  const handleClose = () => {
    dispatch(toggleStudentUpdateFrom());
  };

  return (
    <Modal show={isStudentUpdateFromVisible} onHide={handleClose}>
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
                  name="firstName"
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
                  name="lastName"
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
                  name="dob"
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
                  name="percentage"
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
            <img
              src={`${BASE_URL}/${selectedStudent.profilePhoto}`}
              alt={selectedStudent.firstName}
              width="100"
            />
            <Form.Text type="invalid">
              Update Image by uploading below
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload Profile Photo"
              {...register("file", {})}
            />

            {errors?.file && (
              <Form.Text type="invalid">{errors?.file?.message}</Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateStudentForm;
