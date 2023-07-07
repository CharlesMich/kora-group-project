import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		const errors = {}

		if (!first_name) errors.firstName = 'First name is required'
		if (!last_name) errors.lastName = 'Last name is required'
		if (!email) errors.email = 'Email is required'
		if (!username || username.length < 4) errors.username = 'Username is required'
		if (!password) errors.password = 'Password is required'
		if (password.length < 6) errors.password = 'Password must be 6 characters or more'
		if (!confirmPassword) errors.confirmPassword = 'Confirm password field is required'
		setErrors(errors)
	}, [first_name, last_name, email, username, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (password === confirmPassword) {
			setErrors({});
			dispatch(
				signUp({
					email,
					password,
					username,
					first_name,
					last_name,
				})
			)
				.then(() => {
					closeModal()
					window.location.href = '/'
				})
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) {
						setErrors(data.errors);
					}
				});
		} else {
			setErrors({
				confirmPassword: "Confirm Password field must be the same as the Password field"
			});
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				{submitted && errors.email && <p className="error">{errors.email}</p>}
				{submitted && errors.username && <p className="error">{errors.username}</p>}
				{submitted && errors.firstName && <p className="error">{errors.firstName}</p>}
				{submitted && errors.lastName && <p className="error">{errors.lastName}</p>}
				{submitted && errors.password && <p className="error">{errors.password}</p>}
				{submitted && errors.confirmPassword && (
					<p className="error">{errors.confirmPassword}</p>)}
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input
						type="text"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button
					type="submit"
					disabled={Object.values(errors).length > 0}
					id={Object.values(errors).length > 0 ? 'sign-up-disabled' : 'sign-up-active'}
				>Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
