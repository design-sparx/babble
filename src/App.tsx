import { MantineProvider } from '@mantine/core';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from './pages';
import { AuthContext } from './context/Auth';

interface ProtectedProps {
  children: React.ReactNode
}

const App = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: ProtectedProps): any => {
    if (currentUser == null) {
      return <Navigate to="login"/>;
    }

    return children;
  };

  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </MantineProvider>
  );
};

export default App;
