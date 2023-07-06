import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./userDemoStyle.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DemoUser = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory()
  const onClick = () => {
    dispatch(sessionActions.login("demo@aa.io", "password"))
      .then(closeModal)
      .then(history.push('/'))
  };

  return <Link to='/' onClick={onClick} className="demo-user">Demo User</Link>;
};

export default DemoUser;
