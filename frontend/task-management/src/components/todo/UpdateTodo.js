import React, { useEffect, useState } from "react";
import axios from "axios";

function UpdateTodo({ match }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [priority, setPriority] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:9090/task/update/${match.params.id}`, {
        name,
        description,
        completed,
        priority,
      });
      setSuccessMessage("Task updated successfully");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: something happened");
      }
      return;
    }

    setErrorMessage("");
    await timeout(1000);
  };

  useEffect(() => {
    const loadData = async () => {
      let response = null;
      try {
        response = await axios.get(
          `http://localhost:9090/task/findById/${match.params.id}`
        );
      } catch (error) {
        setDescription("");
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error: something happened");
        }
        return;
      }
      setErrorMessage("");
      setName(response.data.name);
      setDescription(response.data.description);
      setCompleted(response.data.completed);
      setPriority(response.data.priority);
    };

    loadData();
  }, [match.params.id]);

  const showMessage = () => {
    if (successMessage === "") {
      return <div></div>;
    }
    return (
      <div className="alert alert-success" role="alert">
        {successMessage}
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
        <h1>Update Task</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          ></input>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          ></input>
          <label>Completed</label>
          <input
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
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
        <button className="btn btn-primary">Update Todo</button>
      </form>
      <div style={{ marginTop: "20px" }}>
        {showMessage()}
        {showErrorMessage()}
      </div>
    </div>
  );
}

export default UpdateTodo;
