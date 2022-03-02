import "./MessageBox.scss";
import Messenger from "../Messenger/Messenger";
import { useSelector } from "react-redux";

const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <>
      <div id="msg-box">
        {chat.Messages.map((message, i) => {
          return (
            <Messenger
              key={message.id}
              user={user}
              chat={chat}
              message={message}
              index={i}
            />
          );
        })}
      </div>
    </>
  );
};

export default MessageBox;
