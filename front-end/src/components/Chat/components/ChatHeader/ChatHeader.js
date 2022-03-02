import "./ChatHeader.scss";
import { userStatus } from "../../../../utils/helpers";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TiUserDelete } from "react-icons/ti";
import { AiOutlineUserAdd, AiTwotoneDelete } from "react-icons/ai";
import { Fragment, useState } from "react";

const ChatHeader = ({ chat }) => {
  const [showChat, setShowChat] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClick = () => {
    setShowChat(!showChat);
  };

  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div key={user.id} className="chatter-info">
              <h3>
                {user.firstName}
                {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}> </span>
              </div>
            </div>
          );
        })}
        <BsThreeDotsVertical size={25} onClick={handleClick} />

        {showChat ? (
          <div id="settings">
            <div className="Option">
              <AiOutlineUserAdd size={20} />
              <p>Add user to chat</p>
            </div>
            {chat.type === "group" ? (
              <div className="Option">
                <TiUserDelete size={20} />
                <p>Leave chat</p>
              </div>
            ) : null}
            <div className="Option">
              <AiTwotoneDelete size={20} />
              <p>Delete chat</p>
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default ChatHeader;
