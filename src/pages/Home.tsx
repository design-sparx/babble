import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box
} from '@mantine/core';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Chat from '../components/Chat';

const Home = (): JSX.Element => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          overflow: 'hidden'
        }
      }}
      padding={0}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p={0} hiddenBreakpoint="sm" hidden={!opened} width={{
          sm: 200,
          lg: 300
        }}>
          <Sidebar/>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Nav/>
          </div>
        </Header>
      }
    >
      <Box style={{ height: '82.8vh', overflow: 'hidden' }}>
        <Chat/>
      </Box>
    </AppShell>
  );
};

export default Home;
