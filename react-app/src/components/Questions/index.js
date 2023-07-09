import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allQuestions } from "../../store/questions";
import "./questions.css"
import OpenModalButton from "../OpenModalButton";
import UpdateQuestion from "../UpdateQuestion";
import DeleteQuestion from "../DeleteQuestion";
import SpaceSidebar from "../Space/SpaceSidebar";
import { fetchAllFollowers, fetchPostFollows, fetchDeleteFollow } from "../../store/followsReducer";


const QuestionComponent = () => {

    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allQuestions())
        
    }, [dispatch]);
    
    const questions = useSelector(state => Object.values(state.questions))
    const us = useSelector(state => state.session.user)
    let user;
    if (us) {
        user = us.id
    }
    
    useEffect(()=>{
          if(user){
              dispatch(fetchAllFollowers(user))
          }
      },[dispatch, user])
      const followed = useSelector(state=> Object.keys(state.follows))
      
    
    const handleAdd = async(e)=>{
        e.preventDefault();
        const {value} = e.target.dataset
        await dispatch(fetchPostFollows(value))
    }

    const handleRemove = async(e)=>{
        e.preventDefault();
        const {value} = e.target.dataset
        await dispatch(fetchDeleteFollow(value))
    }

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    return (<>
        <div className="main-question-page">

            <div className="space-sidebar">
                < SpaceSidebar />
            </div>
            <div className="display-all-containers">
                {questions.map(ele =>
                    <div className="single-container" key={ele.id}>
                        <div className="question-user-container">
                        <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                                <p className="question-user-name">{ele.User_firstName} {ele.User_lastName}</p>
                                {user !== ele.owner_id && <p className="point">•</p>}
                                {user !== ele.owner_id && followed.includes(ele.owner_id.toString()) && <button key={ele.id} onClick={handleRemove} data-value={ele.owner_id} className="followButton"> Following</button>}
                                {user !== ele.owner_id && !followed.includes(ele.owner_id.toString()) && <button key={ele.id} onClick={handleAdd} data-value={ele.owner_id} className="followButton"> Follow</button>}
                        </div>
                        <NavLink className="question-tilte" key={ele.id} exact to={`/answers/${ele.id}`}>
                            {ele.question}
                        </NavLink>
                        <div className="question-update-delete-container">
                            {user && ele.owner_id === user && <OpenModalButton
                                buttonText="Update"
                                className="delete-update-btn"
                                modalComponent={<UpdateQuestion id={ele.id} />}
                            />}
                            {user && ele.owner_id === user && <OpenModalButton
                                buttonText="Delete"
                                className="delete-update-btn"
                                modalComponent={<DeleteQuestion id={ele.id} />}
                            />}
                        </div>
                          
                    </div>
                )}
            </div>
        </div>
    </>)


}
export default QuestionComponent;
