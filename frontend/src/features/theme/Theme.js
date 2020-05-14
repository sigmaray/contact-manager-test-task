import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setTheme, selectTheme } from "./themeSlice";

const Theme = props => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  return (
    <center className={props.className}>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Theme</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={function(e, v) {
              localStorage.setItem("theme", e.target.value);
              dispatch(setTheme(e.target.value));
            }}
            value={theme}
          >
            <option value="white">White</option>
            <option value="gray">Gray</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </center>
  );
};

export default Theme;
