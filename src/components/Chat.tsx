import { ActionIcon, Box, createStyles, Group, Paper, Text } from '@mantine/core';
import React, { useContext } from 'react';
import { IconDots, IconPhoneCall, IconVideo } from '@tabler/icons';
import Messages from './Messages';
import MessageBox from './MessageBox';
import { ChatContext } from '../context/Chat';

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center'
  },
  body: {
    flex: 2,
    overflow: 'auto'
  },
  messageBox: {
    height: 110
  }
}));

const Chat = (): JSX.Element => {
  const { classes } = useStyles();
  const { data } = useContext(ChatContext);

  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.header} p="md">
        <Text weight={500}>{data.user?.displayName}</Text>
        <Group>
          <ActionIcon>
            <IconVideo size={18}/>
          </ActionIcon>
          <ActionIcon>
            <IconPhoneCall size={18}/>
          </ActionIcon>
          <ActionIcon>
            <IconDots size={18}/>
          </ActionIcon>
        </Group>
      </Paper>
      <Box className={classes.body}>
        <Messages/>
      </Box>
      <Paper p="md" className={classes.messageBox}>
        <MessageBox/>
      </Paper>
    </Box>
  );
};

export default Chat;
