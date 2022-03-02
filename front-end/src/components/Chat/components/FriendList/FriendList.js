import { useSelector, useDispatch } from "react-redux";
import Friends from "../Friends/Friends";
import "./FriendList.scss";

const FriendList = () => {
  const chats = useSelector((state) => state.chatReducer.chats);
   
  return (
    <>
      <div id="friends">
        <div id="title">
          <h3 className="m-0">Friends</h3>
          <button>Add</button>
        </div>
        <hr />
        <div id='friends-box'>
                {
                    chats.length > 0
                    ? chats.map(chat => {
                        return <Friends  chat={chat} key={chat.id}/>
                    })
                    : <p id='no-chat'>no friends</p>
                }
            </div>
      </div>
    </>
  );
};

export default FriendList;
