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
			<nav>
				<div className='nav-bar'>
					<NavLink exact to="/">
						<img src={koralogo} id='logo' alt='logo' />
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
					<NavLink exact to='/spaces'>
						Spaces
					</NavLink>
					<NavLink exact to='/new-question'>
						<button>Add question</button>
					</NavLink>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</nav>
			}
			<>
			</>
		</>
	);
}

export default Navigation;
