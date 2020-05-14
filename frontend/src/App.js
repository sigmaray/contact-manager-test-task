import React from "react";
import { useSelector } from "react-redux";
import { User } from "./features/user/User";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Container from "react-bootstrap/Container";
import Theme from "./features/theme/Theme";
import Contacts from "./features/contacts/Contacts";
import { selectUser } from "./features/user/userSlice";

import { selectTheme } from "./features/theme/themeSlice";

function App() {
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  
  return (
    <Container
      style={{
        background: theme === "white" ? "#fff" : "#ccc"
      }}
      className="mt-2"
    >
      <Theme className="mt-2" />
      <User className="mt-3 mb-3" />
      {user && <Contacts />}
    </Container>
  );
}

export default App;
