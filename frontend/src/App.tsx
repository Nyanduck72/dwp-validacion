import "./App.css";
import { Switch, Route } from "wouter";
import Register from "./pages/register";
import LogIn from "./pages/logIn";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/"}></Route>
        <Route path={"/login"} component={LogIn}>Log in</Route>
        <Route path={"/register"} component={Register}></Route>
      </Switch>
    </>
  );
}

export default App;
