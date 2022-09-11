import { Avatar, createStyles, Group, Paper, Stack, Text, TypographyStylesProvider } from '@mantine/core';
import React from 'react';

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

const Message = (): JSX.Element => {
  const {
    classes,
    cx
  } = useStyles();
  const body = '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>';

  return (
    <Group className={cx(classes.comment, classes.owner)} align="start">
      <Avatar
        src="https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        alt="Jacob Warnhalte"
        radius="xl"
      />
      <Paper p="sm">
        <Stack spacing="xs">
          <Group>
            <Text size="xs">Jacob Warnhalter</Text>
            <Text size="xs" color="dimmed">
              10 minutes ago
            </Text>
          </Group>
          <TypographyStylesProvider className={classes.message}>
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }}/>
          </TypographyStylesProvider>
        </Stack>
      </Paper>
    </Group>
  );
};

export default Message;
