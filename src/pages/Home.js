import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";

import {
  fetchStudents,
  filterBDay,
  filterByPercentage,
} from "../store/slices/student";
import { toggleStudentForm } from "../store/slices/modal";
import { StudentCard } from "../components";

const Home = () => {
  const { loading, students } = useSelector((state) => state.students);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <Layout>
      <Container>
        <div
          className="d-flex align-items-center justify-content-end mt-2"
          style={{
            gap: "1em",
          }}
        >
          <Button
            type="button"
            variant="danger"
            onClick={() => dispatch(filterBDay())}
          >
            Filter by B’day
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => dispatch(filterByPercentage())}
          >
            Filter by %
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => dispatch(toggleStudentForm())}
          >
            Add Student
          </Button>
        </div>

        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <h4 className="mt-5">List of Students</h4>

        <Row className="mt-5">
          {students.length > 0 &&
            students.map((student) => (
              <Col
                className="mb-4"
                sm="12"
                md="6"
                lg="4"
                xl="3"
                key={student._id}
              >
                <StudentCard student={student} />
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
