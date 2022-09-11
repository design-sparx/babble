import React from 'react';
import Message from './Message';
import { Box, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  messages: {
    padding: 0
  }
}));

const Messages = (): JSX.Element => {
  const { classes } = useStyles();
  return (
    <Box className={classes.messages}>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </Box>
  );
};

export default Messages;
