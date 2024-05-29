import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Todos() {
  const [tasks, setTasks] = useState([]);
  const [changed, setChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      let response = null;
      try {
        let url = `http://localhost:9090/task/findAll`;

        response = await axios.get(url);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error: something happened");
        }
        return;
      }
      setErrorMessage("");
      setTasks(response.data);
    };

    loadData();
  }, [changed, filter]);

  const filterControl = () => {
    return (
      <center>
        <div className="col-6 offset-8">
          <label>Show</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">NotCompleted</option>
          </select>
        </div>
      </center>
    );
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:9090/task/markCompleted/${id}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: Marking task completed failed");
      }
      return;
    }
    setErrorMessage("");
    setChanged(!changed);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/task/delete/${id}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: something happened");
      }
      return;
    }
    setErrorMessage("");
    setChanged(!changed);
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
      <h1 className="text-center">Todo List</h1>

      {/* {showErrorMessage()} */}

      {filterControl()}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Priority</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr className={task.completed ? "completed" : ""} key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.completed.toString()}</td>
                <td>{task.priority}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => markCompleted(task.id)}
                  >
                    Mark Completed
                  </button>
                </td>
                <td>
                  <Link to={{ pathname: `/update/${task.id}` }}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                </td>
                <td>
                  <Link to={{ pathname: `/delete/${task.id}` }}>
                    <button className="btn btn-danger">Delete</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Todos;
