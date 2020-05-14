import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { editContact } from "./contactsSlice";

const Edit = ({ data, show, onHide }) => {
  const dispatch = useDispatch();
  return (
    <Modal show={show} onHide={onHide}>
      <Formik
        initialValues={{
          first_name: data ? data.first_name : "",
          last_name: data ? data.last_name : "",
          avatar_url: data ? data.avatar_url : ""
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required("*first_name is required"),
          last_name: Yup.string().required("*last_name is required")
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(editContact(data.id, values));
          resetForm();
          onHide();
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
              <Modal.Title>Add New Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  className={
                    touched.first_name && errors.first_name ? "error" : null
                  }
                />
                {touched.first_name && errors.first_name ? (
                  <div className="error-message">{errors.first_name}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  className={
                    touched.last_name && errors.last_name ? "error" : null
                  }
                />
                {touched.last_name && errors.last_name ? (
                  <div className="error-message">{errors.last_name}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>avatar_url</Form.Label>
                <Form.Control
                  type="text"
                  name="avatar_url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.avatar_url}
                  className={touched.avatar_url && errors.avatar_url ? "error" : null}
                />
                {touched.avatar_url && errors.avatar_url ? (
                  <div className="error-message">{errors.avatar_url}</div>
                ) : null}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Save changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Edit;
