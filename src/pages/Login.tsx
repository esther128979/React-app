import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="auth-page-container">
      <Container className="py-5">
        <Row className="justify-content-center align-items-center">
          {/* צד של תמונות או עיצוב */}
          <Col md={6} className="text-center d-none d-md-block">
            <h1 className="display-5 bakery-title mb-4">Welcome Back to <br />Cookie Monster 🍪</h1>
            <p className="lead text-muted">Fresh treats, always ready! Log in to order your favorites.</p>
            <img
              src="https://i.etsystatic.com/54907703/r/il/ca160c/6688687115/il_fullxfull.6688687115_i6ss.jpg"
              alt="Cookies"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </Col>

          {/* צד של טופס */}
          <Col md={6} lg={5}>
            <Card className="shadow-lg p-4 animated-card mt-4 mt-md-0">
              <h3 className="text-center mb-3">Login to your account</h3>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string().email("Invalid email").required("Required"),
                  password: Yup.string().required("Required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  setServerError("");
                  try {
                    const res = await api.get("/users", {
                      params: {
                        email: values.email,
                        password: values.password,
                      },
                    });

                    if (res.data.length === 1) {
                      const user = res.data[0];
                      dispatch(login(user));
                      navigate("/");
                    } else {
                      setServerError("Invalid email or password");
                    }
                  } catch {
                    setServerError("Server error. Please try again.");
                  }
                  setSubmitting(false);
                }}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger small" />
                  </div>

                  {serverError && <Alert variant="danger">{serverError}</Alert>}

                  <div className="d-grid mt-3">
                    <Button type="submit" variant="success">Login</Button>
                  </div>

                  <div className="text-center mt-3 small">
                    Don't have an account?{" "}
                    <a href="/register" className="text-decoration-underline">Register here</a>
                  </div>
                </Form>
              </Formik>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
