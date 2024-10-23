import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const OverLay = (props) => {
  const [languages, setLanguages] = useState([]);
  const languageRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const retrieveAllLanguages = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: props.selectedUser.id }),
        }
      );
      if (!res.ok) {
        throw new Error("error");
      }
      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addLanguage = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: props.selectedUser.id,
            language: languageRef.current.value,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("error");
      }
      retrieveAllLanguages();
      languageRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLanguage = async (language) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: props.selectedUser.id,
            language: language,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("error");
      }
      retrieveAllLanguages();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: props.selectedUser.id,
          name: nameRef.current.value,
          age: ageRef.current.value,
          country: countryRef.current.value,
        }),
      });
      if (!res.ok) {
        throw new Error("error");
      }
      props.retrieveAllUsers();
      props.setShowUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveAllLanguages();
  }, []);

  return (
    <div className="backdrop">
      <h2>Language Register App</h2>

      <div className="container border m-4 p-4">
        <h4>Update this user :</h4>
        <div className="row my-2">
          <label className="col-sm-3">Name</label>
          <input
            className="col-sm-3"
            type="text"
            ref={nameRef}
            placeholder="1 to 50 chars only..."
            defaultValue={props.selectedUser.name}
          />
        </div>
        <div className="row my-2">
          <label className="col-sm-3">Age</label>
          <input
            className="col-sm-3"
            type="number"
            ref={ageRef}
            defaultValue={props.selectedUser.age}
          />
        </div>
        <div className="row my-2">
          <label className="col-sm-3">Country</label>
          <input
            className="col-sm-3"
            type="text"
            ref={countryRef}
            placeholder="1 to 50 chars only..."
            defaultValue={props.selectedUser.country}
          />
        </div>
        <button className="col-sm-1 mx-2" onClick={updateUser}>
          update
        </button>
        <button
          className="col-sm-1 mx-2"
          onClick={() => props.setShowUpdateModal(false)}
        >
          cancel
        </button>
      </div>

      <div className="container border m-4 p-4">
        <h4>Add a new language for this user :</h4>
        <div className="row my-2">
          <label className="col-sm-3">Language</label>
          <input
            className="col-sm-3"
            type="text"
            ref={languageRef}
            placeholder="valid languages only..."
          />
        </div>
        <button className="col-sm-1 mx-2" onClick={addLanguage}>
          add
        </button>

        <div className="row my-2"></div>
        <div className="row my-2"></div>

        <h4>All languages list for this user:</h4>
        {languages.map((item, idx) => (
          <div key={idx} className="row my-2">
            <label className="col-sm-3">{item}</label>
            <button
              className="col-sm-1 mx-2"
              onClick={() => deleteLanguage(item)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          selectedUser={props.selectedUser}
          retrieveAllUsers={props.retrieveAllUsers}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
