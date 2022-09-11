import React from 'react';
import { Box, createStyles } from '@mantine/core';
import Search from './Search';
import Chats from './Chats';

const useStyles = createStyles((theme) => ({
  sidebar: {
    height: '100%'
  }
}));

const Sidebar = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box className={classes.sidebar}>
      <Search/>
      <Chats/>
    </Box>
  );
};

export default Sidebar;
