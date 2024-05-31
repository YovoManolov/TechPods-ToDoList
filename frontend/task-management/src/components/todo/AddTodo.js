import React, { useEffect, useState } from "react";
import axios from "axios";

function AddTodo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("false");
  const [priority, setPriority] = useState("LOW");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9090/task/create", {
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

    setMessage("New task is successfully created.");
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
        <h1>Add New Task</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="form-control"
          ></input>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="form-control"
          ></input>
          <label>Completed</label>
          <input
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            placeholder="completed"
            className="form-control"
          ></input>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-control"
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <button className="btn btn-primary">Add New Task</button>
      </form>
      <div style={{ marginTop: "20px" }}>
        {showMessage()}
        {showErrorMessage()}
      </div>
    </div>
  );
}

export default AddTodo;
