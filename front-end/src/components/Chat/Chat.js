import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import "./Chat.scss";
import { useEffect } from "react";
import { fetchChats } from "../../store/actions/chat";

const Chat = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }, [dispatch]);

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
