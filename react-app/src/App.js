import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllAnswers from "./components/AllAnswers";
import CreateAnswer from "./components/CreateAnswer";
import UpdateAnswer from "./components/UpdateAnswer";
import ManageAnswers from "./components/ManageAnswer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/answers/new/:quesionId"><CreateAnswer/></Route>
          <Route exact path="/answers/update/:answerId"><UpdateAnswer/></Route>
          <Route path="/answers"><AllAnswers/></Route>
          <Route path="/manage-answers"><ManageAnswers/></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
