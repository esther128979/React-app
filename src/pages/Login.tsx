import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  return (
    <div className="login-container">
      <h2>התחברות</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
          password: Yup.string().required("שדה חובה"),
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
              console.log("התחברות הצליחה:", user);

              // ✅ שורה חשובה:
              localStorage.setItem("user", JSON.stringify(user));

              navigate("/");
            } else {
              setServerError("אימייל או סיסמה שגויים");
            }
          } catch (err) {
            setServerError("שגיאה בשרת");
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

          {serverError && <div className="error">{serverError}</div>}

          <button type="submit">התחבר</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
