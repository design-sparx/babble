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
  Box
} from '@mantine/core';

const Register = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
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
        <TextInput label="Display Name" placeholder="display name" required/>
        <TextInput label="Email" placeholder="email address" mt="md" required/>
        <PasswordInput label="Password" placeholder="Your password" mt="md" required/>
        <Box mt="md">
          <Group position="center">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
          </Group>
          {(file != null) && (
            <Text size="sm" align="center" mt="sm">
              Picked file: {file.name}
            </Text>
          )}
        </Box>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
