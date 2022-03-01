import "./Navbar.scss";
import { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../store/actions/auth";

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user);
  const [showToggle,setShowToggle] = useState(false)

  const handleClick = () => {
    setShowToggle(!showToggle)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div className="navbar card-shadow">
        <h2>Chat.io</h2>
        <div className="navbar__profile__menu">
          <img src={user.avatar} alt="Avatar" />
          <p onClick={handleClick} className="navbar__profile__menu__text">
            Yo! {user.firstName} <RiArrowDownSFill size={40} />
          </p>

         {
           showToggle && 
           <div className="navbar__profile__dropdown">
           <p className="navbar__profile__dropdown__text">Update profile</p>
           <p onClick={handleLogout} className="navbar__profile__dropdown__text">Logout</p>
         </div>
         }
        </div>
      </div>
    </>
  );
};

export default Navbar;
