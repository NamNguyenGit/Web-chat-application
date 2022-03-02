import { useSelector, useDispatch } from "react-redux";
import Friends from "../Friends/Friends";
import { setCurrentChat } from "../../../../store/actions/chat";
import "./FriendList.scss";

const FriendList = () => {

  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chatReducer.chats);
  
  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  return (
    <>
      <div id="friends" className="shadow-light">
        <div id="title">
          <h3 className="m-0">Friends</h3>
          <button>Add</button>
        </div>
        <hr />
        <div id="friends-box">
          {chats.length > 0 ? (
            chats.map((chat) => {
              return (
                <Friends
                  click={() => openChat(chat)}
                  chat={chat}
                  key={chat.id}
                />
              );
            })
          ) : (
            <p id="no-chat">no friends</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendList;