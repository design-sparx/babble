import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  FileButton,
  Box,
  Stack,
  Alert
} from '@mantine/core';
// import { useForm } from '@mantine/form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { IconAlertCircle } from '@tabler/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = (): JSX.Element => {
  const [file, setFile] = useState<File | null>();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // @ts-expect-error
  const handleSubmit = async (e: React.SyntheticEvent): any => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      displayName: { value: string }
      email: { value: string }
      password: { value: string }
    };
    const displayName = target.displayName.value; // typechecks!
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    console.log(displayName, email, password);

    try {
      /**
       * auth
       */
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

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
        (error: any) => {
          // Handle unsuccessful uploads
          console.log(error);
          setError(true);
        },
        () => {
          /**
           * update user profile
           */
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            });

            /**
             * add user to users collection in firestore
             */
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });

            /**
             * add user to user chats
             */
            await setDoc(doc(db, 'userChats', res.user.uid), {});

            /**
             * navigate to home page after login
             */
            navigate('/');
          }).catch(e => console.log(e));
        }
      );
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900
        })}
      >
        Welcome to chatbox!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account yet?{' '}
        <Anchor<'a'> href="/login" size="sm">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error &&
          <Alert icon={<IconAlertCircle size={16}/>} title="Bummer!" color="red">
            Something went wrong
          </Alert>
        }
        <form action="" onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Display Name"
              placeholder="display name"
              required
              name="displayName"
            />
            <TextInput
              label="Email"
              placeholder="email address"
              required
              name="email"
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              name="password"
            />
            <Box>
              <Group position="center">
                <FileButton
                  onChange={setFile}
                  accept="image/png,image/jpeg"
                >
                  {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
              </Group>
              {(file != null) && (
                <Text size="sm" align="center" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
            </Box>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
