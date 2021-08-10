import { Switch, Route, Redirect } from "react-router-dom";
import AddNewBook from "./components/AddNewBook";
import Main from "./components/Main";
import Library from "./components/Library";

function App() {
  console.log("App...");
  return (
    <>
      <Library>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/mybooks" />
          </Route>
          <Route path="/mybooks">
            <Main />
          </Route>
          <Route path="/addnewbook">
            <AddNewBook type="add" />
          </Route>
          <Route path="/updatebook/:id">
            <AddNewBook type="update" />
          </Route>
        </Switch>
      </Library>
    </>
  );
}

export default App;
