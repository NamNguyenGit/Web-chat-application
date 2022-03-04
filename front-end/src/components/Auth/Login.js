import loginImage from "../../assets/images/login.svg";
import "./Auth.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux"
import {login} from "../../store/actions/auth"

const Login = ({history}) => {

  const dispatch = useDispatch()

  const [state,setState] = useState({
    email: "hai@gmail.com",
    password: "secret"
  })

  const {email,password}=  state

  const clickSubmit = (e) => {
    e.preventDefault();

    dispatch(login({email,password}, history))
   
    
  };

  const handleChange = (name) => e => {
    setState({
      ...state,
      [name]: e.target.value
    })
  }


  return (
    <>
      <div className="auth__container">
        <div className="auth__container__card">
          <div className="auth__container__card__contents card-shadow">
            <div className="auth__container__card__contents__image">
              <img src={loginImage} alt="Login" />
            </div>
            <div className="auth__container__card__contents__form">
              <h2>Welcome back</h2>
              <form
                onSubmit={clickSubmit}
                className="auth__container__card__contents__form__section"
              >
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    required="required"
                    onChange={handleChange('name')}
                  />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-2">
                  <input
                    onChange={handleChange('name')}
                    type="password"
                    value={password}
                    placeholder="Password"
                    required="required"
                  />
                </div>
                <button>Let's talk to the world!</button>
                <Link to="/register">
                  <p>Don't have an account? Register</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
