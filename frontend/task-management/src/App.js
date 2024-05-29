import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./components/page/About";
import Todos from "./components/todo/ViewTodos";
import AddTodo from "./components/todo/AddTodo";
import UpdateTodo from "./components/todo/UpdateTodo";
import NotFound from "./components/page/NotFound";

import "./bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Switch>
            <Route exact path="/" render={(props) => <Todos {...props} />} />
            <Route
              exact
              path="/todo"
              render={(props) => <Todos {...props} />}
            />
            <Route
              exact
              path="/add"
              render={(props) => <AddTodo {...props} />}
            />
            <Route
              exact
              path="/update/:id"
              render={(props) => <UpdateTodo {...props} />}
            />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
