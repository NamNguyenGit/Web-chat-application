import "./Navbar.scss";
import { useState, Fragment } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../store/actions/auth";
import Modal from "../../../Modal/Modal";
import { updateProfile } from "../../../../store/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [showToggle, setShowToggle] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => {
    setShowToggle(!showToggle);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const [state, setState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    password: "",
   
  });

  const [avatar, setAvatar] = useState('')
  

  const { firstName, lastName, gender, email, password } = state;
 

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    const form = {firstName, lastName, gender, email , avatar}
    if(password.length > 0) form.password = password
    const formData = new FormData()
    for(const key in form) {
      formData.append(key, form[key])
    }

    //dispatch action
    dispatch(updateProfile(formData)).then(() => setShowProfile(false))

  };

  return (
    <>
      <div className="navbar card-shadow">
        <h2>Chat.io</h2>
        <div className="navbar__profile__menu">
          <img src={user.avatar} alt="Avatar" />
          <p onClick={handleClick} className="navbar__profile__menu__text">
            Yo! {user.firstName} <RiArrowDownSFill size={40} />
          </p>

          {showToggle && (
            <div className="navbar__profile__dropdown " onClick={handleClick}>
              <p
                onClick={() => setShowProfile(true)}
                className="navbar__profile__dropdown__text"
              >
                Update profile
              </p>
              <p
                onClick={handleLogout}
                className="navbar__profile__dropdown__text"
              >
                Logout
              </p>
            </div>
          )}

          {showProfile && (
            <Modal click={() => setShowProfile(false)}>
              <Fragment key="header">
                <h3 className="m-0">Update Profile</h3>
              </Fragment>

              <Fragment key="body">
                <form className="navbar__form">
                  <div className="navbar__form__input__field mb-1">
                    <input
                      type="text"
                      value={firstName}
                      onChange={handleChange("firstName")}
                      required='required'
                      placeholder="First name"
                    />
                  </div>
                  <div className="navbar__form__input__field mb-1">
                    <input
                      type="text"
                      value={lastName}
                      onChange={handleChange("lastName")}
                      required='required'
                      placeholder="Last name"
                    />
                  </div>
                  <div className="navbar__form__input__field mb-1">
                    <select value={gender} onChange={handleChange("gender")}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="navbar__form__input__field mb-1">
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange("email")}
                      required='required'
                      placeholder="Email"
                    />
                  </div>
                  <div className="navbar__form__input__field mb-2">
                    <input
                      type="password"
                      value={password}
                      onChange={handleChange("password")}
                      required='required'
                      placeholder="Password"
                    />
                  </div>
                  <div className="navbar__form__input__field mb-2">
                    <input
                      type="file"
                     
                      onChange={e => setAvatar(e.target.files[0])}
                     
                    />
                  </div>
                </form>
              </Fragment>

              <Fragment key="footer">
                <button className="navbar__form__input__field__btn" onClick={clickSubmit}>
                  UPDATE
                </button>
              </Fragment>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
