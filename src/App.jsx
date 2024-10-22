import React, { useEffect, useRef, useState } from "react";

function App() {
  const [languages, setLanguages] = useState([]);
  const languageRef = useRef();

  const retrieveAllLanguages = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      throw new Error("error");
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

  useEffect(() => {
    retrieveAllLanguages();
  }, []);

  return (
    <div>
      <h1>Language List</h1>
      <div className="row">
        <input
          type="text"
          ref={languageRef}
          placeholder="language"
          className="col-md-3"
        />
        <button className="col-md-3" onClick={addLanguage}>
          add
        </button>
      </div>
      <br />
      <br />
      <div className={`row`}>
        <div className="col-md-3">Language</div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
      </div>
      {languages.map((item, idx) => {
        return (
          <div key={idx} className="row">
            <div className="col-sm-3">{item.language}</div>
            <button
              className="col-sm-2"
              onClick={() => deleteLanguage(item.language)}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
