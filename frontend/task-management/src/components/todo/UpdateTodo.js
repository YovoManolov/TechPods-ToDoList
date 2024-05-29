import React, { useEffect, useState } from "react";
import axios from "axios";
/* Dealing with dates and times in React Native can be challenging. 
Thankfully, there's a handy solution called Moment. js. 
It is a popular JavaScript library that simplifies working with 
dates and times by providing a range of powerful features and utilities.*/
// import moment from "moment";

import { useHistory } from "react-router-dom";

function UpdateTodo({ match }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [priority, setPriority] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:9090/task/${match.params.id}`, {
        name,
        description,
        completed,
        priority,
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: something happened");
      }
      return;
    }

    setErrorMessage("");
    //setMessage("Todo successfully updated");
    await timeout(1000);
    //history.push("/todo");
  };

  useEffect(() => {
    const loadData = async () => {
      let response = null;
      try {
        response = await axios.get(
          `http://localhost:9090/task/${match.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
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
    };

    loadData();
  }, [match.params.id]);

  // useEffect(() => {
  //   setMessage("");
  // }, [name]);

  const showMessage = () => {
    if (description === "") {
      return <div></div>;
    }
    return (
      <div className="alert alert-success" role="alert">
        {description}
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
        <h1>Update Todo</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Update Todo</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
  );
}

export default UpdateTodo;
