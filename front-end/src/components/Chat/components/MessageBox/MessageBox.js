import "./MessageBox.scss";
import { useEffect, useRef } from "react";
import Messenger from "../Messenger/Messenger";
import { useSelector } from "react-redux";

const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);

  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);

  const msgBox = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBox.current.scrollHeight);
    }, 100);
  }, [scrollBottom]);

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value
}

  return (
    
      <div id="msg-box" ref={msgBox}>
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
    
  );
};

export default MessageBox;
