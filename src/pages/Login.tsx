import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button, Alert, Stack
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconAlertCircle } from '@tabler/icons';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = (): JSX.Element => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // @ts-expect-error
  const handleSubmit = async (e: React.SyntheticEvent): any => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontWeight: 900
        })}
      >
        Welcome back to chatbox!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="/register" size="sm">
          Create account
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
            <TextInput label="Email" placeholder="you@mantine.dev" name="email" required/>
            <PasswordInput label="Password" placeholder="Your password" name="password" required/>
            <Group position="apart">
              <Checkbox label="Remember me"/>
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
