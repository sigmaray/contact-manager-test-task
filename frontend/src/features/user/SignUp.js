import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import handleError from "../../lib/handleError";
import noty from "../../lib/noty";

const SignUp = () => {
  return (
    <Modal.Dialog>
      <Formik
        initialValues={{ email: "", password: "", password_confirmation: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
          password: Yup.string().required("*Password is required"),
          password_confirmation: Yup.string().required(
            "*Password confirmation is required"
          )
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          axios({
            method: "POST",
            url: "/api/users",
            data: { api_user: values }
          })
            .then(response => {
              setSubmitting(false);
              resetForm();
              noty("Signed up succesfully. Now you can sign in");
            })
            .catch(error => {
              setSubmitting(false);
              handleError(error);
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
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
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
                <Form.Group>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    name="password_confirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                    className={
                      touched.password_confirmation &&
                      errors.password_confirmation
                        ? "error"
                        : null
                    }
                  />
                  {touched.password_confirmation &&
                  errors.password_confirmation ? (
                    <div className="error-message">
                      {errors.password_confirmation}
                    </div>
                  ) : null}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Sign Up
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal.Dialog>
  );
};

export default SignUp;
