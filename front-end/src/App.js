import Login from "./components/Auth/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Auth/Register";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from "./components/Router/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute path="/" exact component={Chat} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
