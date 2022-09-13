import { Alert, Avatar, Box, createStyles, Divider, Group, Text, TextInput, UnstyledButton } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { IconAlertCircle, IconSearch } from '@tabler/icons';
import { collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/Auth';

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
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<any>();
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  /**
   * handle search
   */
  const handleSearch = async (): Promise<any> => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (e) {
      setErr(true);
      console.log(e);
    }
  };

  /**
   * on enter press
   * @param e
   */
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async (): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const combinedId: string = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    /**
     * check whether the group(chats in firestore) exists if not create
     */
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        /**
         * create chat in chats collection
         */
        await setDoc(doc(db, 'chats', combinedId), { message: [] });

        /**
         * create current user chat
         */
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoUrl
          },
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          [combinedId + '.date']: serverTimestamp()
        });

        /**
         * create user chat
         */
        await updateDoc(doc(db, 'userChats', user.uid), {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoUrl
          },
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          [combinedId + '.date']: serverTimestamp()
        });
      }
    } catch (e) {
      console.log(e);
    }

    setUser(null);
    setUsername('');
  };

  return (
    <Box>
      <TextInput
        placeholder="find a user"
        rightSection={<IconSearch size={18}/>}
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      {err &&
        <Alert icon={<IconAlertCircle size={16}/>} title="Bummer!" color="red">
          User not found
        </Alert>
      }
      {(Boolean(user)) &&
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <UnstyledButton key={user.uid} className={classes.user} onClick={handleSelect}>
          <Group>
            <Avatar src={user.photoURL} radius="xl"/>
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {user.displayName}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      }
      <Divider/>
    </Box>
  );
};

export default Search;
