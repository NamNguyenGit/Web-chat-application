import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import "./Chat.scss";

const Chat = () => {
  const user = useSelector((state) => state.authReducer.user);
  console.log(user);
  return (
    <>
      <div className="chat__container">
        <Navbar />
        <div className="chat__container__wrap">data</div>
      </div>
    </>
  );
};

export default Chat;
