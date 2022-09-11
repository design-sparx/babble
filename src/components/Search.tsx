import { Avatar, Box, createStyles, Group, Text, TextInput, UnstyledButton } from '@mantine/core';
import React from 'react';
import { IconSearch } from '@tabler/icons';

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

const Search = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box>
      <TextInput placeholder="find a user" rightSection={<IconSearch size={18}/>}/>
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar src={null} radius="xl"/>

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              john doe
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default Search;
