import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import { AuthContext } from '../context/Auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/Chat';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
    }
  }
}));

const Chats = (): JSX.Element => {
  const { classes } = useStyles();
  const [chats, setChats] = useState<any>({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = (): () => void => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats((doc.data() != null) ? doc.data() : {});
      });

      return () => {
        unsub();
      };
    };

    (Boolean(currentUser.uid)) && getChats();
  }, [currentUser.uid]);

  /**
   * handle select
   * @param u
   */
  const handleSelect = (u: any): void => {
    dispatch({
      type: 'CHANGE_USER',
      payload: u
    });
  };

  return (
    <Box>
      {Object.entries(chats)?.sort((a: any, b: any) => b[1].date - a[1].date).map((c: any) =>
        <UnstyledButton
          className={classes.user}
          key={c[0]}
          onClick={() => handleSelect(c[1].userInfo)}
        >
          <Group>
            <Avatar src={c[1].userInfo?.photoURL} radius="xl"/>

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {c[1].userInfo?.displayName}
              </Text>

              <Text color="dimmed" size="xs">
                {c[1].lastMessage?.text}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      )}
    </Box>
  );
};

export default Chats;
