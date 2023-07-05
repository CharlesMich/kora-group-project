import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allQuestions } from "../../store/questions";
import "./questions.css"
import OpenModalButton from "../OpenModalButton";
import UpdateQuestion from "../UpdateQuestion";
import DeleteQuestion from "../DeleteQuestion";



const QuestionComponent = () => {

    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allQuestions())
        
    }, [dispatch]);
    
    const questions = useSelector(state => Object.values(state.questions))
    const us = useSelector(state=>state.session.user)
    let user;
    if(us){
        user = us.id 
    }

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    return (<>
        <div className="allQuestions">
            {questions.map(ele =>
                <div className="questionNum" key={ele.id}>
                    <div className="userPart">
                        <div className="profileDiv"></div>
                        <div className="textDiv">
                            <p className="nom">{ele.User_firstName} {ele.User_lastName}</p>

                        </div>
                    </div>
                    <div className="questionPart">
                        <div>
                        <NavLink key={ele.id} exact to={`/answers/${ele.id}`}>
                        <p className="ques">{ele.question}</p>
                        </NavLink>
                        {user && ele.owner_id === user && <OpenModalButton
                        buttonText="Update"
                        modalComponent={<UpdateQuestion id={ele.id}/>}
                        /> }
                        {user && ele.owner_id === user && <OpenModalButton 
                        buttonText="Delete"
                        modalComponent={<DeleteQuestion id={ele.id}/> }
                        />}
                        </div>
                        <p>I've never had one and I'm 99% sure that I'm not capable of maintaining one.

                            I would have to fall in love with someone who's kind and decent, however I was programmed and conditioned at a young age to fall in love with assholes, who will hurt me, just like my mother did.

                            Let's say I would go against my feelings and get with someone who's genuinely a “good" person. Right from the bat I know that I would not be attracted to this person. Even if they would be conventionally attractive.

                            Next, I would question everything nice they say and do. Why are they being nice to me? They must have a reason. They're trying to manipulate me. To get something from me. They say they love me in a selfless way, but would they die for me? Nope.

                            When I was a teenager, my ex asked me if I would die for him and I said “yes, of course". I was telling the truth. He smiled and said “I know you believe that's true, but I don't think you understand the implications of giving up your life for another person. No one would do that".</p>
                    </div>
                </div>
            )}
        </div>
    </>)


}
export default QuestionComponent;
