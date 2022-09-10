import { MantineProvider } from '@mantine/core';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from './pages';

const App = (): JSX.Element => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </MantineProvider>
  );
};

export default App;
