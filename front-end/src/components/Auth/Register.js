import registerImage from "../../assets/images/register.svg";
import "./Auth.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { register } from "../../store/actions/auth";

const Register = ({history}) => {

  const dispatch = useDispatch()

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    email: "",
    password: "",
  });

  const { firstName, lastName, gender, email, password } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    dispatch(register({firstName, lastName, gender, email,password}, history))
  
  };

  return (
    <>
      <div className="auth__container">
        <div className="auth__container__card">
          <div className="auth__container__card__contents card-shadow">
            <div className="auth__container__card__contents__image">
              <img src={registerImage} alt="Login" />
            </div>
            <div className="auth__container__card__contents__form">
              <h2>Talk with me</h2>
              <form  onSubmit={clickSubmit} className="auth__container__card__contents__form__section">
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input
                    type="text"
                    value={firstName}
                    onChange={handleChange("firstName")}
                    placeholder="First name"
                  />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input
                    type="text"
                    value={lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Last name"
                  />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <select value={gender} onChange={handleChange("gender")}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange("email")}
                    placeholder="Email"
                  />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-2">
                  <input
                    type="password"
                    value={password}
                    onChange={handleChange("password")}
                    placeholder="Password"
                  />
                </div>
                <button>Yay</button>
                <Link to="/login">
                  <p>Back To Login</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
