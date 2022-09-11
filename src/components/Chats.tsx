import React from 'react';
import { Avatar, Box, createStyles, Group, Text, UnstyledButton } from '@mantine/core';

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

  return (
    <Box>
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar src={null} radius="xl"/>

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              john doe
            </Text>

            <Text color="dimmed" size="xs">
              lorem ipsum
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default Chats;
