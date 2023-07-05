import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import quoralogo from '../../assets/Quora_logo_2015.svg'
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			<div className='nav-bar'>
				<NavLink exact to="/">
					<img src={quoralogo} id='logo' alt='logo' />
				</NavLink>
				<NavLink exact to='/'>
					Home
				</NavLink>
				<NavLink exact to='/questions/current'>
					Questions
				</NavLink>
				<NavLink exact to='/manage-answers'>
					Answers
				</NavLink>
				{isLoaded && (
					<ProfileButton user={sessionUser} />
				)}
				<NavLink exact to='/new-question'>
					<button>Add question</button>
				</NavLink>
			</div>
		</nav>
	);
}

export default Navigation;
