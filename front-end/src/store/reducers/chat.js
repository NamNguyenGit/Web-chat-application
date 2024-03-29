import {
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  FRIEND_OFFLINE,
  FRIENDS_ONLINE,
  FRIEND_ONLINE,
  SET_SOCKET,
  RECEIVED,
  SENDER_TYPING,
  PAGINATE_MESSAGE,
  INCREMENT_SCROLL,
} from "../actions/chat";

const initialState = {
  chats: [],
  currentChat: {},
  socket: {},
  newMessage: { chatId: null, seen: null },
  scrollBottom: 0,
  senderTyping: {typing: false}
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: payload,
        scrollBottom: state.scrollBottom + 1,
        newMessage: { chatId: null, seen: null },
      };
    case FRIENDS_ONLINE: {
      const chatsCopy = state.chats.map((chat) => {
        return {
          ...chat,
          Users: chat.Users.map((user) => {
            if (payload.includes(user.id)) {
              return {
                ...user,
                status: "online",
              };
            }
            return user;
          }),
        };
      });

      return {
        ...state,
        chats: chatsCopy,
      };
    }

    case FRIEND_ONLINE: {
      let currentChatCopy = { ...state.currentChat };

      const chatsCopy = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: "online",
            };
          }
          return user;
        });
        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users,
          };
        }

        return {
          ...chat,
          Users,
        };
      });

      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
      };
    }

    case FRIEND_OFFLINE: {
      let currentChatCopy = { ...state.currentChat };

      const chatsCopy = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: "offline",
            };
          }
          return user;
        });
        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users,
          };
        }

        return {
          ...chat,
          Users,
        };
      });

      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
      };
    }

    case SET_SOCKET: {
      return {
        ...state,
        socket: payload,
      };
    }

    case RECEIVED: {
      const { userId, message } = payload;
      let currentChatCopy = { ...state.currentChat };
      let newMessage = { ...state.newMessage };
      let scrollBottom = state.scrollBottom;

      const chatsCopy = state.chats.map((chat) => {
        if (message.chatId === chat.id) {
          if (message.User.id === userId) {
            scrollBottom++;
          } else {
            newMessage = {
              chatId: chat.id,
              seen: false,
            };
          }

          if (message.chatId === currentChatCopy.id) {
            currentChatCopy = {
              ...currentChatCopy,
              Messages: [...currentChatCopy.Messages, ...[message]],
            };
          }

          return {
            ...chat,
            Messages: [...chat.Messages, ...[message]],
          };
        }
        return chat;
      });
      if (scrollBottom === state.scrollBottom) {
        return {
          ...state,
          chats: chatsCopy,
          currentChat: currentChatCopy,
          newMessage,
          senderTyping: {typing: false}
        };
      }
      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
        newMessage,
        scrollBottom,
        senderTyping: { typing: false },
      };
    }

    case SENDER_TYPING: {
     if(payload.typing) {
       return {
         ...state,
         senderTyping: payload,
         scrollBottom: state.scrollBottom + 1
       }
     }

     return {
       ...state,
       senderTyping: payload
     }
    }

    case PAGINATE_MESSAGE: {
      const {messages, id ,pagination} = payload
      let currentChatCopy = {...state.currentChat}

      const chatsCopy = state.chats.map(chat => {
        if(chat.id === id) {
          const shifted = [...messages,...chat.Messages]
          currentChatCopy = {
            ...currentChatCopy,
            Messages: shifted,
            Pagination: pagination
          }

          return {
            ...chat,
            Messages: shifted,
            Pagination: pagination

          }
        }

        return chat
      })
      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy
      }
    }
    case INCREMENT_SCROLL:
      return {
        ...state,
        scrollBottom: state.scrollBottom + 1,
        newMessage: {chatId: null, seen: true}
      }

    default: {
      return state;
    }
  }
};

export default chatReducer;
