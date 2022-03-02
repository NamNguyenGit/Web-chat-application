import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import "./Chat.scss";
import { useEffect } from "react";
import { fetchChats } from "../../store/actions/chat";
import FriendList from "./components/FriendList/FriendList";
import Message from "./components/Message/Message";

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
      <div id="chat-container">
        <Navbar />
        <div id="chat-wrap">
          <FriendList />
          <Message />
        </div>
      </div>
    </>
  );
};

export default Chat;
