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
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		let errors = [];

		if (submitted) {
			if (!email.trim()) errors.push();
			if (!email.includes('@')) errors.push('Must be a valid email');
			if (!username.trim() || username.trim().length < 4) errors.push('Username is required and must be at least 4 characters');
			if (!first_name.trim()) errors.push('First name is required');
			if (!last_name.trim()) errors.push('Last name is required');
			if (!password.trim()) errors.push('Password is required');
			if (password.length < 6) errors.push('Password must be 6 characters or more');
			if (password.length && !confirmPassword.trim()) errors.push('Confirm password field is required');
			if (password !== confirmPassword) errors.push("The confirmation password doesn't match the password");
		}

		setErrors(errors);
	}, [submitted, first_name, last_name, email, username, password, confirmPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (password === confirmPassword && first_name.trim() && last_name.trim() && email.trim() && email.includes("@") && username.trim().length > 3 && password.length > 5) {
			setErrors([]);
			try {
				await dispatch(
					signUp({
						email: email,
						password: password,
						username: username,
						first_name: first_name,
						last_name: last_name,
					})
				).then(() => {
					closeModal()
					window.location.href = '/'
				})
			} catch (error) {
				if (Array.isArray(error)) {
					setErrors(error);
				}
				else {
					setErrors(["An error occured. Please try again"])
				}
			};
		} else if (password !== confirmPassword) {
			setErrors(["Confirm Password field must be the same as the Password field"]);
		}
	};

	return (
		<>
			<h2>Sign Up</h2>
			<div className='signup-modal-form'>
				{/* {submitted && errors.confirmPassword && (
					<p className="error">{errors.confirmPassword}</p>)} */}
				{/* {submitted && errors.generalError && <p className="error">{errors.generalError}</p>} */}
				{submitted && errors.length ? <h3 className="signup-error-title">Please complete each field as requested</h3> : null}
				{submitted && errors.map((error, index) => <p className="signup-error" key={index}>{error}</p>)}
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
				<button
					onClick={handleSubmit}
					className="signup-btn signup-modal-btn"
					disabled={Object.values(errors).length > 0}
					id={Object.values(errors).length > 0 ? 'sign-up-disabled' : 'sign-up-active'}
				>Join Kora!</button>
			</div>
		</>
	);
}

export default SignupFormModal;
