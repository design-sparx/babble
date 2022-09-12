import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

interface AuthContextProps {
  children: React.ReactNode
}

export const AuthContext = createContext<any>([[], () => null]);

export const AuthContextProvider = ({ children }: AuthContextProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('', user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (<AuthContext.Provider value={{ currentUser }}>
    {children}
  </AuthContext.Provider>);
};
