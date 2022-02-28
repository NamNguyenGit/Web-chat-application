import loginImage from "../../assets/images/login.svg";
import "./Auth.scss";
import { Link } from "react-router-dom";

const Login = () => {
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
              <form className="auth__container__card__contents__form__section">
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-2">
                  <input type="password" placeholder="Password" />
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
