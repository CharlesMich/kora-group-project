import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(setShowMenu(false))
    history.push("/login")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user &&
        <>
          <button className="nav-user-button" onClick={openMenu}>
            <i className="fas fa-user-circle" />
            <ul className={ulClassName} ref={ulRef}>
              <>
                <li className="nav-dropdown-li">{user.username}</li>
                <li className="nav-dropdown-li">{user.email}</li>
                <li className="nav-dropdown-li">
                  <button className="nav-dropdown-logout" onClick={handleLogout}>Log Out</button>
                </li>
              </>
            </ul>
          </button>
        </>
      }
    </>
  );
}

export default ProfileButton;
