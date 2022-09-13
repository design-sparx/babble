import { Avatar, createStyles, Group, Paper, Stack, Text, TypographyStylesProvider } from '@mantine/core';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/Auth';
import { ChatContext } from '../context/Chat';
import { Timestamp } from 'firebase/firestore';

const useStyles = createStyles((theme) => ({
  comment: {
    width: '50%',
    flexWrap: 'nowrap',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md
  },

  message: {
    fontSize: theme.fontSizes.sm
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0
    }
  },

  owner: {
    flexDirection: 'row-reverse',
    marginLeft: 'auto'
  }
}));

interface MessageProps {
  message: {
    date: { nanoseconds: number, seconds: number }
    id: string
    senderId: string
    text: string
    file?: string
  }
}

const Message = ({ message }: MessageProps): JSX.Element => {
  const {
    classes,
    cx
  } = useStyles();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const {
    date,
    text,
    senderId,
    file
  } = message;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <Group className={cx(classes.comment, senderId === currentUser.uid ? classes.owner : '')} align="start" ref={ref}>
      <Avatar
        src={senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
        alt={`${senderId} profile image`}
        radius="xl"
      />
      <Paper p="sm">
        <Stack spacing="xs">
          <Group>
            <Text size="xs">{data.user.displayName}</Text>
            <Text size="xs" color="dimmed">
              {new Timestamp(date.seconds, date.nanoseconds).toDate().toLocaleDateString()}
            </Text>
          </Group>
          <TypographyStylesProvider className={classes.message}>
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: text }}/>
          </TypographyStylesProvider>
          {(file != null) && <img src={file} alt="" />}
        </Stack>
      </Paper>
    </Group>
  );
};

export default Message;
