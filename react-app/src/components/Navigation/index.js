import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import koralogo from '../../assets/kora-01.png'
import './Navigation.css';

function Navigation({ isLoaded, user }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
		{sessionUser && 
			<nav className='nav-bar'>
				<div className='nav-bar-container'>
					<NavLink className="shared-nav-bar" exact to="/">
						<img src={koralogo} id='logo' alt='logo' />
					</NavLink>
					<NavLink className="shared-nav-bar nav-btn nav-home-btn" exact to='/'>
						Home
						<i className="nav-icon fa-solid fa-house"></i>
					</NavLink>
					<NavLink className="shared-nav-bar nav-btn" exact to='/questions/current'>
						Questions
						<i className="nav-icon fa-solid fa-question"></i>
					</NavLink>
					<NavLink className="shared-nav-bar nav-btn" exact to='/manage-answers'>
						Answers
						<i className="nav-icon fa-solid fa-comments"></i>
					</NavLink>
					<NavLink className="shared-nav-bar nav-btn" exact to='/spaces'>
						Spaces
						<i className="nav-icon fa-solid fa-hashtag"></i>
					</NavLink>
					<NavLink className="nav-add-question-btn" exact to='/new-question'>
						Add question <i className="nav-icon fa-solid fa-plus"/>
					</NavLink>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</nav>
			}
		</>
	);
}

export default Navigation;
