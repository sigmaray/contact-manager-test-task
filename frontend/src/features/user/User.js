import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, signOut } from "./userSlice";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export function User(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className={props.className}>
      <p>
        <i>{JSON.stringify({ user: user })}</i>
      </p>
      {!user ? (
        <React.Fragment>
          <SignIn />
          <SignUp />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            onClick={function() {
              dispatch(signOut());
            }}
            variant="danger"
          >
            Logout
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}
