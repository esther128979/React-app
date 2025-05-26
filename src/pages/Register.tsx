import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // axios
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
    password: Yup.string()
      .required("שדה חובה")
      .min(8, "לפחות 8 תווים")
      .matches(/[A-Z]/, "חייב לכלול אות גדולה")
      .matches(/[a-z]/, "חייב לכלול אות קטנה")
      .matches(/[0-9]/, "חייב לכלול מספר")
      .matches(/[^a-zA-Z0-9]/, "חייב לכלול תו מיוחד"),
    confirmPassword: Yup.string()
      .required("שדה חובה")
      .oneOf([Yup.ref("password")], "הסיסמאות לא תואמות"),
  });

  return (
    <div className="register-container">
      <h2>הרשמה</h2>

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
              setFieldError("email", "אימייל זה כבר רשום במערכת");
              setSubmitting(false);
              return;
            }

            await api.post("/users", {
              email: values.email,
              password: values.password,
              isAdmin: false,
            });

            alert("נרשמת בהצלחה!");
            resetForm();
            navigate("/login");
          } catch (err) {
            setServerError("שגיאה בשמירת המשתמש");
          }
          setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">אימייל</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">סיסמה</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="confirmPassword">אישור סיסמה</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          {serverError && <div className="error">{serverError}</div>}

          <button type="submit">הרשמה</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
