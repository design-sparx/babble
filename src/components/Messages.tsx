import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { Box, createStyles } from '@mantine/core';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/Chat';

const useStyles = createStyles(() => ({
  messages: {
    padding: 0
  }
}));

const Messages = (): JSX.Element => {
  const { classes } = useStyles();
  const [messages, setMessages] = useState<any>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Box className={classes.messages}>
      {messages.map((m: any) => <Message key={m.id} message={m}/>)}
    </Box>
  );
};

export default Messages;
