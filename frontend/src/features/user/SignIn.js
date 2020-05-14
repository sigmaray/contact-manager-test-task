import React from "react";
import { Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserAndFetchContacts } from "./userSlice";
import handleError from '../../lib/handleError'

const SignIn = () => {
  const dispatch = useDispatch();
  return (
    <Modal.Dialog>
      <Formik
        initialValues={{
          email: "", password: ""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
          password: Yup.string().required("*Password is required")
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          axios({
            method: "POST",
            url: "/api/users/sign_in",
            data: { api_user: values }
          })
            .then(response => {
              setSubmitting(false);
              resetForm();
              const u = {
                ...response.data,
                token: response.headers.authorization.split(" ")[1]
              };
              dispatch(setUserAndFetchContacts(u));
            })
            .catch(error => {
              setSubmitting(false);
              handleError("Couldn't sign in")
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "error" : null}
                />
                {touched.email && errors.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    touched.password && errors.password ? "error" : null
                  }
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Sign in
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal.Dialog>
  );
};
export default SignIn;
