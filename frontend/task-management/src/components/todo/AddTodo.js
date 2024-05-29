import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddTodo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9090/task", {
        name,
        description,
        completed,
        priority,
      });
    } catch (error) {
      setMessage("");
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: something happened");
      }
      return;
    }

    setName("");
    setDescription("");
    setCompleted("false");
    setPriority("LOW");
    setErrorMessage("");
    setMessage("Todo successfully created");
  };

  useEffect(() => {
    setMessage("");
  }, [name]);

  const showMessage = () => {
    if (message === "") {
      return <div></div>;
    }
    return (
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    );
  };

  const showErrorMessage = () => {
    if (errorMessage === "") {
      return <div></div>;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Add New Todo</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Add Todo Task</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
  );
}

export default AddTodo;
