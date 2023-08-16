import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import logo from '../../assets/kora-01.png'
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validation, setVavidation] = useState([])
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [submitted, setSubmitted] = useState(false)

	let err = {}
	if (!email.trim()) err['email'] = 'email is required';
	if (!email.includes('@')) err['email'] = 'valid email is required'
	if (!username.trim() || username.trim().length < 4) err['username'] = 'Username is required and must be at least 4 characters';
	if (!first_name.trim()) err['firstName'] = 'First name is required';
	if (!last_name.trim()) err['lastName'] = 'Last name is required';
	if (!password.trim()) err['password'] = 'Password is required';
	if (password.length < 6) err['password'] = 'Password must be 6 characters or more';
	if (password.length && !confirmPassword.trim()) err['confirmPassword'] = 'Confirm password field is required';
	if (password !== confirmPassword) err['confirmPassword'] = "The confirmation password doesn't match the password";

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors(err)
		if (!Object.values(err).length) {
			const data = await dispatch(signUp({
				email: email,
				password: password,
				username: username,
				first_name: first_name,
				last_name: last_name,
			}))
			if(data.length){
				setVavidation(data)
			}else{
				window.location.href = '/'
				closeModal()

			}
			
		}
	};
	

	return (
		<>
			<h2>Sign Up</h2>
			<div className='signup-modal-form'>
				
				{validation.length > 0 && validation.map((error, index) => <p className="signup-error" key={index}>{error}</p>)}
				<label>
					Email
				</label>
				<input
					type="text"
					placeholder="Your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="signup-boxarea"
				/>
            {errors.email && <p className="signup-error">{errors.email}</p>}

				<label>
					Username
				</label>
				<input
					type="text"
					placeholder="What would you like to be called?"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="signup-boxarea"
				/>
            {errors.username && <p className="signup-error">{errors.username}</p>}

				<label>
					First Name
				</label>
				<input
					type="text"
					placeholder="what's your name?"
					value={first_name}
					onChange={(e) => setFirstName(e.target.value)}
					required
					className="signup-boxarea"
				/>
              {errors.firstName && <p className="signup-error" >{errors.firstName}</p>}

				<label>
					Last Name
				</label>
				<input
					type="text"
					placeholder="what about your last name?"
					value={last_name}
					onChange={(e) => setLastName(e.target.value)}
					required
					className="signup-boxarea"
				/>
              {errors.lastName && <p className="signup-error">{errors.lastName}</p>}

				<label>
					Password
				</label>
				<input
					type="password"
					placeholder="Write a password that no one will guess"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="signup-boxarea"
				/>
          {errors.password && <p className="signup-error">{errors.password}</p>}

				<label>
					Confirm Password
				</label>
				<input
					type="password"
					placeholder="confirm is the correct password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					className="signup-boxarea"
				/>
          {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}

				<button
					onClick={handleSubmit}
					className="signup-btn signup-modal-btn"
					id={Object.values(errors).length > 0 ? 'sign-up-disabled' : 'sign-up-active'}
				>Join Kora!</button>
			</div>
		</>
	);
}

export default SignupFormModal;
