import "./MessageInput.scss";
import { BsEmojiSmile, BsCardImage } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AiOutlineCloudUpload, AiFillDelete,AiFillBell } from "react-icons/ai";
import ChatServices from "../../../../services/chatServices";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { incrementScroll } from "../../../../store/actions/chat";

const MessageInput = ({ chat }) => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user);
  const newMessage = useSelector((state => state.chatReducer.newMessage))
  const [message, setMessage] = useState("");
  const fileUpload = useRef();
  const msgInput = useRef();
  const [image, setImage] = useState("");
  const [showNewMsg,setShowNewMsg] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false);

  const socket = useSelector((state) => state.chatReducer.socket);

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    }

    if (value.length === 0) {
      receiver.typing = false;
      socket.emit("typing", receiver);
    }
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
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setShowEmoji(false)
    setImage("");

    // send message with socket
    socket.emit("message", msg);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);

    ChatServices.uploadImage(formData)
      .then((image) => {
        sendMessage(image);
      })
      .catch((err) => console.log(err));
  };

  const selectEmoji = (emoji) => {
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;
    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus()
    msgInput.current.selectionEnd = endPosition + emojiLength
  };

  useEffect(() => {
    if(!newMessage.seen && newMessage.chatId ===chat.id) {
      const msgBox = document.getElementById("msg-box")
      if(msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
        dispatch(incrementScroll())
      } else {
        setShowNewMsg(true)
      }
    }
    else {
      setShowNewMsg(false)
    }
  },[newMessage, dispatch])

  const handleShowNewMsg = () => {
    dispatch(incrementScroll())
    setShowNewMsg(false)
  }

  return (
    <>
      <div id="input-container">
        <div id="image-upload-container">
          <div>
            {
              showNewMsg
              ? <div id="message-notification" onClick={handleShowNewMsg}>
                <AiFillBell className="fa-icon"/>
                <p className="m-0">new message</p>
              </div>
              : null
            }
          </div>
          <div id="image-upload">
            {image.name ? (
              <div id="image-details">
                <p className="m-0">{image.name}</p>
                <AiOutlineCloudUpload
                  className="fa-icon"
                  onClick={handleImageUpload}
                />
                <AiFillDelete
                  className="fa-icon"
                  onClick={() => setImage("")}
                />
              </div>
            ) : null}
            <BsCardImage
              onClick={() => fileUpload.current.click()}
              className="fa-icon"
            />
          </div>
        </div>
        <div id="message-input">
          <input
            ref={msgInput}
            value={message}
            type="text"
            placeholder="Message..."
            onChange={(e) => handleMessage(e)}
            onKeyDown={(e) => handleKeyDown(e, false)}
          />
          <BsEmojiSmile
            className="fa-icon"
            onClick={() => setShowEmoji(!showEmoji)}
          />
        </div>

        <input
          id="chat-image"
          ref={fileUpload}
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {showEmoji ? (
          <Picker
            title="Pick your emoji"
            emoji="point_up"
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
            onSelect={selectEmoji}
          />
        ) : null}
      </div>
    </>
  );
};

export default MessageInput;
