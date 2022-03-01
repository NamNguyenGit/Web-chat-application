import "./Navbar.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <>
      <div className="navbar card-shadow">
        <h2>Chat.io</h2>
        <div className="navbar__profile__menu">
          <img src="" alt="Avatar" />
          <p>{user.firstName} {user.lastName}</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
