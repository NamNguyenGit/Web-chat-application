import {useSelector} from "react-redux"

const Chat = () => {

  const user = useSelector(state => state.authReducer.user)
  console.log(user)

    return (
      <>
        <h1>Chat screen</h1>
        <p>Welcome, {user.firstName}</p>
      </>
    );
  };
  
  export default Chat;
  