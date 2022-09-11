import { ActionIcon, Box, Button, FileButton, Group, Stack, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { IconPaperclip, IconPictureInPicture, IconSend } from '@tabler/icons';

const MessageBox = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);

  console.log(file);

  return (
    <Box>
      <Stack spacing="sm">
        <TextInput
          placeholder="type a new message"
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
          <Button leftIcon={<IconSend size={18}/>}>send</Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default MessageBox;
