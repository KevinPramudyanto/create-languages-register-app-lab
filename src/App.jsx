import React, { useEffect, useRef, useState } from "react";
import UpdateModal from "./components/UpdateModal";

function App() {
  const [languages, setLanguages] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const languageRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const retrieveAllLanguages = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addLanguage = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageRef.current.value,
      }),
    });

    if (!res.ok) {
      throw new Error("error");
    }

    retrieveAllLanguages();
    languageRef.current.value = "";
  };

  const deleteLanguage = async (language) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/languages/" + language,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error("error");
    }

    retrieveAllLanguages();
  };

  const retrieveAllUsers = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });

    if (!res.ok) {
      throw new Error("error");
    }

    retrieveAllUsers();
    nameRef.current.value = "";
    ageRef.current.value = "";
    countryRef.current.value = "";
  };

  const deleteUser = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
      }),
    });

    if (!res.ok) {
      throw new Error("error");
    }

    retrieveAllUsers();
  };

  useEffect(() => {
    retrieveAllLanguages();
    retrieveAllUsers();
  }, []);

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          selectedUser={selectedUser}
          retrieveAllUsers={retrieveAllUsers}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <h2>Language Register App</h2>

      <div className="container border m-4 p-4">
        <h4>Add a language :</h4>
        <div className="row my-2">
          <label className="col-sm-3">Language</label>
          <input
            className="col-sm-3"
            type="text"
            ref={languageRef}
            placeholder="1 to 20 chars only..."
          />
        </div>
        <button className="col-sm-1 mx-2" onClick={addLanguage}>
          add
        </button>

        <div className="row my-2"></div>
        <div className="row my-2"></div>

        <h4>All languages list :</h4>
        {languages.map((item, idx) => (
          <div key={idx} className="row my-2">
            <label className="col-sm-3">{item.language}</label>
            <button
              className="col-sm-1 mx-2"
              onClick={() => deleteLanguage(item.language)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <div className="container border m-4 p-4">
        <h4>Add a new user :</h4>
        <div className="row my-2">
          <label className="col-sm-3">Name</label>
          <input
            className="col-sm-3"
            type="text"
            ref={nameRef}
            placeholder="1 to 50 chars only..."
          />
        </div>
        <div className="row my-2">
          <label className="col-sm-3">Age</label>
          <input className="col-sm-3" type="number" ref={ageRef} />
        </div>
        <div className="row my-2">
          <label className="col-sm-3">Country</label>
          <input
            className="col-sm-3"
            type="text"
            ref={countryRef}
            placeholder="1 to 50 chars only..."
          />
        </div>
        <button className="col-sm-1 mx-2" onClick={addUser}>
          add
        </button>

        <div className="row my-2"></div>
        <div className="row my-2"></div>

        <h4>All users list :</h4>
        {users.map((user) => (
          <div key={user.id} className="row my-2">
            <label className="col-sm-3">{user.name}</label>
            <label className="col-sm-3">{user.age}</label>
            <label className="col-sm-3">{user.country}</label>
            <button
              className="col-sm-1 mx-2"
              onClick={() => {
                setShowUpdateModal(true);
                setSelectedUser(user);
              }}
            >
              detail
            </button>
            <button
              className="col-sm-1 mx-2"
              onClick={() => deleteUser(user.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
