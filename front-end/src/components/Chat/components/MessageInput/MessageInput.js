import "./MessageInput.scss";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";

const MessageInput = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const socket = useSelector(state=>state.chatReducer.socket)

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    // notify user is typing
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") sendMessage(imageUpload);
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? image : message,
    };

    setMessage("");
    setImage("");

    // send message with socket
    socket.emit('message',msg)
  };

  return (
    <>
      <div id="input-container">
        <div id="message-input">
          <input
            type="text"
            placeholder="Message..."
            onChange={(e) => handleMessage(e)}
            onKeyDown={(e) => handleKeyDown(e, false)}
          />
          <BsEmojiSmile className="fa-icon" />
        </div>
      </div>
    </>
  );
};

export default MessageInput;
