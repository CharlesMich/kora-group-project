import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./userDemoStyle.css"

const DemoUser = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
const onClick = () => {
  dispatch(login({ email: "demo@aa.io", password: "password" }))
  .then(() => closeModal())
};

return <Link to= '/api/question/' onClick={onClick} className="demo-user">Demo User</Link>;
};

export default DemoUser;
