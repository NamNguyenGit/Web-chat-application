import ChatServices from "../../services/chatServices";

export const FETCH_CHATS = "FETCH_CHATS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const FRIENDS_ONLINE = "FRIENDS_ONLINE";
export const FRIEND_ONLINE = "FRIEND_ONLINE";
export const FRIEND_OFFLINE = "FRIEND_OFFLINE";
export const SET_SOCKET = "SET_SOCKET";
export const RECEIVED = "RECEIVED";
export const SENDER_TYPING = "SENDER_TYPING";
export const PAGINATE_MESSAGE = "PAGINATE_MESSAGE";
export const INCREMENT_SCROLL = "INCREMENT_SCROLL";

export const fetchChats = () => dispatch => {
    return ChatServices.fetchChats()
        .then(data => {
            data.forEach(chat => {
                chat.Users.forEach(user => {
                    user.status = 'offline'
                })
                chat.Messages.reverse()
            })

            dispatch({ type: FETCH_CHATS, payload: data })
            return data
        })
        .catch(err => {
            throw err
        })
}


export const setCurrentChat = (chat) => dispatch => {
    dispatch({type: SET_CURRENT_CHAT, payload: chat})
}

export const onlineFriends = (friends) => dispatch => {
    dispatch({type: FRIENDS_ONLINE, payload: friends})
}

export const onlineFriend = (friend) => dispatch => {
    dispatch({type: FRIEND_ONLINE, payload: friend})
}

export const offlineFriend = (friend) => dispatch => {
    dispatch({type: FRIEND_OFFLINE, payload: friend})
}

export const setSocket = (socket) => dispatch => {
    dispatch({type: SET_SOCKET, payload: socket})
}

export const receivedMessage = (message,userId) => dispatch => {
    dispatch({type: RECEIVED, payload: {message,userId} })
}

export const senderTyping = (sender) => dispatch => {
    dispatch({type: SENDER_TYPING, payload: sender})
}

export const paginateMessage = (id,page) => dispatch => {
    return ChatServices.paginateMessages(id,page)
    .then(({messages,pagination}) => {
        if(typeof messages !== 'undefined' && messages.length > 0) {
            messages.reverse()
            const payload = { messages,id,pagination}
            dispatch({type: PAGINATE_MESSAGE, payload})
            return true
        }
        return false
    })
    .catch(err => {
        throw err
    })
 
}

export const incrementScroll = () => dispatch => {
    dispatch({type: INCREMENT_SCROLL})
}
