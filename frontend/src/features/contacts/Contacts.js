import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectContacts, selectLoading } from "./contactsSlice";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { likeContact, unlikeContact, deleteContact } from "./contactsSlice";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import Edit from "./Edit";
import New from "./New";

const Contacts = props => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);

  const [editIndex, setEditIndex] = useState();
  const [editIsShown, setEditIsShown] = useState(false);
  const [newIsShown, setNewIsShown] = useState(false);

  const editById = function(editIndex) {
    setEditIndex(editIndex);
    setEditIsShown(true);
  };

  const selectOptions = {
    true: "true",
    false: "false"
  };

  const columns = [
    {
      dataField: "avatar_url",
      text: "Avatar",
      formatter: (cellContent, row) => {
        return <img src={cellContent} width={100} alt="" />;
      }
    },
    {
      dataField: "first_name",
      text: "First Name"
    },
    {
      dataField: "last_name",
      text: "Last Name"
    },
    {
      dataField: "is_liked",
      text: "Liked?",
      filter: selectFilter({
        options: selectOptions
      })
    },
    {
      dataField: "id",
      isDummyField: true,
      text: "Actions",
      formatter: (_cellContent, row) => {
        return (
          <React.Fragment>
            <Button
              variant="success"
              onClick={function() {
                dispatch(likeContact(row.id));
              }}
              disabled={row.is_liked}
            >
              L
            </Button>
            <Button
              variant="warning"
              onClick={function() {
                dispatch(unlikeContact(row.id));
              }}
              disabled={!row.is_liked}
              className="ml-1"
            >
              U
            </Button>
            <Button
              variant="primary"
              onClick={function() {
                editById(row.id);
              }}
              className="ml-1"
            >
              E
            </Button>
            <Button
              variant="danger"
              onClick={function() {
                if (
                  window.confirm("Are you sure?")
                )
                  dispatch(deleteContact(row.id));
              }}
              className="ml-1"
            >
              D
            </Button>
          </React.Fragment>
        );
      }
    }
  ];

  return (
    <div className={props.className}>
      {loading ? (
        <div>..Loading contacts..</div>
      ) : (
        <div>
          {contacts.length ? (
            <React.Fragment>
              <Edit
                show={editIsShown}
                onHide={function() {
                  setEditIsShown(false);
                }}
                data={
                  contacts && contacts.find(element => element.id === editIndex)
                }
              />
              <New
                show={newIsShown}
                onHide={function() {
                  setNewIsShown(false);
                }}
              />
              <Button
                onClick={function() {
                  setNewIsShown(true);
                }}
                className="mb-3"
              >
                New
              </Button>
              <BootstrapTable
                keyField="id"
                data={contacts}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory()}
              />
            </React.Fragment>
          ) : (
            "No contacts found"
          )}
        </div>
      )}
    </div>
  );
};

export default Contacts;
