import API from "./api";

const ChatServices =  {
    
    fetchChats: () => {
        return API.get("/chats")
            .then(({data}) => {
                return data
            })
            .catch(err => {
                throw err
            })
    }
}
 
export default ChatServices;