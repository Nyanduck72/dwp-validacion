import { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "wouter";
import Register from "./pages/register";
import RegisteredUserCheck from "./pages/registeredUserCheck";

function App() {
  const [isJumpscared, setIsJumpscared] = useState<boolean>(false);

  useEffect(() => {
    // Ensure the Egg library is loaded before using it
    if (window.Egg) {
      const egg = new window.Egg();
      egg.addCode("f,u,g,a,a,l,c,a,r,l,s", () => {
        setIsJumpscared(true);
        const t = setTimeout(() => {
          setIsJumpscared(false);
        }, 4000); // Display the jumpscare for 1 second
        return () => clearTimeout(t);
      });
      egg.listen();
    }
  }, []);

  return (
    <>
      {isJumpscared && (
        <div className="jumpscare-container">
          <div className="jumpscare-content"></div>
        </div>
      )}
      <Switch>
        <Route path={"/"} component={Register}></Route>
        <Route path={"/registered-users"} component={RegisteredUserCheck}></Route>
      </Switch>
    </>
  );
}

export default App;
