import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllAnswers from "./components/Answers/AllAnswers";
import CreateAnswer from "./components/Answers/CreateAnswer";
import UpdateAnswer from "./components/Answers/UpdateAnswer";
import ManageAnswers from "./components/Answers/ManageAnswer";
import QuestionComponent from "./components/Questions";
import CreateQuestion from "./components/CreateQuestion";
import CreateSpace from "./components/Space/CreateSpace";
import SpaceSidebar from "./components/Space/SpaceSidebar";
import AllSpaces from "./components/Space/AllSpaces";
import SpaceTile from "./components/Space/SpaceTile";

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
          <Route exact path="/answers/new/:quesionId"><CreateAnswer /></Route>
          <Route exact path="/answers/update/:answerId"><UpdateAnswer /></Route>
          <Route path="/answers/:questionId"><AllAnswers /></Route>
          <Route path="/manage-answers"><ManageAnswers /></Route>
          <Route path='/spaces'><AllSpaces /></Route>
          {/* <Route path='/spaces'><CreateSpace /></Route> */}
          <Route path="/">
            <SpaceSidebar />
            <QuestionComponent />
          </Route>
          <Route path="/questions/new">
            <CreateQuestion />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
