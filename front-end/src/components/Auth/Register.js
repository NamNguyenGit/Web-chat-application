import registerImage from "../../assets/images/register.svg";
import "./Auth.scss";
import { Link } from "react-router-dom";

const Register = () => {
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
              <form className="auth__container__card__contents__form__section">
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input type="text" placeholder="First name" />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input type="text" placeholder="Last name" />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <select>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="auth__container__card__contents__form__section__field mb-1">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="auth__container__card__contents__form__section__field mb-2">
                  <input type="password" placeholder="Password" />
                </div>
                <button>Yay</button>
                <Link to="/login">
                  <p>Back To Loginn</p>
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
