import React, { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './Auth';

interface ChatContextProps {
  children: React.ReactNode
}

export const ChatContext = createContext<any>([[], () => null]);

export const ChatContextProvider = ({ children }: ChatContextProps): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {}
  };

  const chatReducer = (state: any, action: any): any => {
    const { payload } = action;
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > payload.uid
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              ? currentUser.uid + payload.uid
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              : payload.uid + currentUser.uid
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
