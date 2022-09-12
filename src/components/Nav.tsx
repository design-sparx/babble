import { Avatar, Box, createStyles, Group, Menu, UnstyledButton, Text, Burger } from '@mantine/core';
import React, { useState } from 'react';
import {
  IconLogout,
  IconSettings,
  IconChevronDown, IconMessage2
} from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const useStyles = createStyles((theme) => ({
  navbar: {
    width: '100%'
  },
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },
  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
  },
  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none'
    }
  }
}));

const Nav = (): JSX.Element => {
  const {
    classes,
    cx
  } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleLogout = (): void => {
    void signOut(auth);
  };

  return (
    <Box className={classes.navbar}>
      <Group position="apart">
        <IconMessage2 size={28}/>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>
        <Menu
          width={260}
          position="bottom-end"
          transition="pop-top-right"
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
            >
              <Group spacing={7}>
                <Avatar
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="profile picture" radius="xl" size={32}/>
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  john doe
                </Text>
                <IconChevronDown size={12} stroke={1.5}/>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} stroke={1.5}/>}>Account settings</Menu.Item>
            <Menu.Item
              icon={<IconLogout size={14} stroke={1.5}/>}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
};

export default Nav;
