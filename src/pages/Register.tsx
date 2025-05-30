import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import { Container, Button, Alert, Card } from "react-bootstrap";


const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "Must include uppercase")
      .matches(/[a-z]/, "Must include lowercase")
      .matches(/[0-9]/, "Must include number")
      .matches(/[^a-zA-Z0-9]/, "Must include special character"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  return (
    <div className="auth-background d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="mb-4 text-center fade-in-top">
        <h1 className="fw-bold text-success">🍪 Cookie Monster</h1>
        <p className="text-muted mb-0">Create your sweet account</p>
      </div>

      <Card style={{ width: "100%", maxWidth: "420px" }} className="p-4 shadow fade-in-bottom">
        <h3 className="text-center mb-4">Register</h3>

        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
            setServerError("");
            try {
              const check = await api.get("/users", {
                params: { email: values.email },
              });

              if (check.data.length > 0) {
                setFieldError("email", "This email is already registered.");
                setSubmitting(false);
                return;
              }

              await api.post("/users", {
                email: values.email,
                password: values.password,
                isAdmin: false,
              });

              alert("Registered successfully!");
              resetForm();
              navigate("/login");
            } catch (err) {
              setServerError("Error saving user.");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
              </div>

              {serverError && <Alert variant="danger">{serverError}</Alert>}

              <div className="d-grid">
                <Button type="submit" variant="success" className="mt-2" disabled={isSubmitting}>
                  Register
                </Button>
              </div>

              <div className="text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="fw-bold text-decoration-none">
                    Login
                  </Link>
                </small>
              </div>
            </Form>
          )}
        </Formik>
      </Card>

      <footer className="mt-4 text-muted small text-center fade-in-bottom">
        © 2025 Cookie Monster. Developed by Esther Kampner 💻🍪
      </footer>
    </div>
  );
};

export default Register;
