import { useSelector, useDispatch } from "react-redux";
import Friends from "../Friends/Friends";
import { setCurrentChat } from "../../../../store/actions/chat";
import { useState,Fragment } from "react";
import Modal from "../../../Modal/Modal"
import ChatServices from "../../../../services/chatServices";
import "./FriendList.scss";

const FriendList = () => {

  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chatReducer.chats);

  const [showFriendsModal,setShowFriendsModal] = useState(false)
  const [suggestion,setSuggestion] = useState([])
  
  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  const searchFriends = (e) => {
    ChatServices.searchUsers(e.target.value)
      .then(res=> setSuggestion(res))
  }

  const addNewFriends = (id) => {
    //dispatch
  }

  return (
    <>
      <div id="friends" className="shadow-light">
        <div id="title">
          <h3 className="m-0">Friends</h3>
          <button onClick={() => setShowFriendsModal(true)}>Add</button>
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
        {
          showFriendsModal && 
          <Modal click={() => setShowFriendsModal(false)} >
            <Fragment key='header'>
                <h3 className="m-0">Create new chat</h3>
            </Fragment>
            <Fragment key='body'>
              <p>Find friends by name</p>
              <input type="text" placeholder="Search..."
            onInput={(e) => searchFriends(e)} 
            />
            <div id="suggestions">
              {
                suggestion.map(user => {
                  return <div key={user.id} className="suggestion">
                        <p className="m-0" >{user.firstName} {user.lastName}</p>
                        <button onClick={() => addNewFriends(user.id)}>ADD</button>
                  </div>
                })
              }

            </div>
            </Fragment>
          </Modal>
        }
      </div>
    </>
  );
};

export default FriendList;
