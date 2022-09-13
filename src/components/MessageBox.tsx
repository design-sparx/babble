import { ActionIcon, Box, Button, FileButton, Group, Stack, TextInput } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { IconPaperclip, IconPictureInPicture, IconSend } from '@tabler/icons';
import { AuthContext } from '../context/Auth';
import { ChatContext } from '../context/Chat';
import { arrayUnion, doc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const MessageBox = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (): Promise<any> => {
    if (file != null) {
      /**
       * send messsage with file
       */
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, file as Blob);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (e: any) => {
          // Handle unsuccessful uploads
          console.log(e);
          console.log(error);
          setError(true);
        },
        () => {
          /**
           * update user profile
           */
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL
              })
            });
          }).catch(e => console.log(e));
        }
      );
    } else {
      /**
       * send message without file
       */
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: message,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }
    /**
     * update user chats latest message and time
     */
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      [data.chatId + '.lastMessage']: {
        text: message
      },
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      [data.chatId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      [data.chatId + '.lastMessage']: {
        text: message
      },
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      [data.chatId + '.date']: serverTimestamp()
    });

    setMessage('');
    setFile(null);
  };

  return (
    <Box>
      <Stack spacing="sm">
        <TextInput
          placeholder="type a new message"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <Group position="apart">
          <Group>
            <FileButton onChange={setFile} accept="*">
              {(props) =>
                <ActionIcon {...props}>
                  <IconPaperclip size={18}/>
                </ActionIcon>}
            </FileButton>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) =>
                <ActionIcon {...props}>
                  <IconPictureInPicture size={18}/>
                </ActionIcon>}
            </FileButton>
          </Group>
          <Button
            leftIcon={<IconSend size={18}/>}
            onClick={handleSend}
          >
            send
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default MessageBox;
