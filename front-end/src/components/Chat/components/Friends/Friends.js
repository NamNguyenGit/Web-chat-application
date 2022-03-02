import "./Friends.scss"

const Friends = ({chat}) => {
  return (
    <>
        <p>{chat.Users[0].firstName} {chat.Users[0].lastName}</p>
    </>
  );
};

export default Friends;
