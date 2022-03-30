import React, { useState, Fragment, useRef } from "react";
// import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import Edit from "./components/Edit";
import EditDelete from "./components/EditDelete";
import Header from "./components/Header";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [showResults, setShowResults] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState();
  const inputEl = useRef("");
  const [searcResults, setSearchResults] = useState();


  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      // id: nanoid(),
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  console.log(data);


  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };



  const handleDeleteClick = (contactId) => {
    if (window.confirm("Are you sure you want delete?")) {

      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === contactId);

      newContacts.splice(index, 1);

      setContacts(newContacts);
    }
  };

  const show = () => setShowResults(true)

  const getSearchTerm = () => {
    setSearchTerm(inputEl.current.value);
  }


  function searchResult() {


    const result = data.map((add) =>
      add.email
    ).filter((filtered) => searchTerm === filtered)
    console.log(result);
    return result;

  }


  return (
    <div >
      <div>
        <Header inputEl={inputEl} getSearchTerm={getSearchTerm} show={show}></Header>
        <div className="ui search">
          <div>

            <h2>Found: {searchResult()}</h2>
            <i className="search icon"></i>
          </div>
        </div>

        {showResults ? (
          <form onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="firstName"
              required="required"
              placeholder="FirstName"
              onChange={handleAddFormChange}
            />

            <input
              type="text"
              name="lastName"
              required="required"
              placeholder="LastName"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="phoneNumber"
              required="required"
              placeholder="phone number"
              onChange={handleAddFormChange}
            />
            <input
              type="email"
              name="email"
              required="required"
              placeholder="email"
              onChange={handleAddFormChange}
            />
            <button type="submit">Add</button>
          </form>
        ) : (
          <h1></h1>
        )}
      </div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>lastName</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <Edit
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}

                  />
                ) : (
                  <EditDelete
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>


    </div>
  );
};

export default App;
