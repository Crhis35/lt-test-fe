import React, { useState } from 'react';
import {
  Button,
  Modal,
  Paper,
  TextInput,
  Container,
  Title,
} from '@mantine/core';
import ProductPdf from './pdf';
import { pdf } from '@react-pdf/renderer';
import { API_URL } from '../../constants';
import zip from 'jszip';
import { showNotification } from '@mantine/notifications';
import { IconShieldCheck, IconFaceIdError } from '@tabler/icons-react';
import { ListProductsQuery } from '../../gql/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface EmailModalProps {
  items: ListProductsQuery['listProducts']['items'];
}
interface EmailFormInput {
  to: string;
}

const validationSchema = z.object({
  to: z.string().email(),
});

export default function EmailModal({ items }: EmailModalProps) {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInput>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      to: '',
    },
  });

  const onSubmit = async ({ to }: EmailFormInput) => {
    try {
      if (!items || items.length === 0) return;
      setLoading(true);
      const blob = await pdf(<ProductPdf items={items} />).toBlob();
      const Zip = new zip();
      const element = document.createElement('a');

      element.href = URL.createObjectURL(blob);
      element.download = `document.pdf`;
      document.body.appendChild(element);
      element.click();

      Zip.file(`document.pdf`, blob);

      const file = await Zip.generateAsync({ type: 'base64' });
      await (
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to,
            subject: 'Sended file',
            fileName: 'File.zip',
            file,
            html: '<h1>Hello world</h1>',
          }),
        })
      ).json();

      showNotification({
        title: 'Email sended',
        message: `PDF sended to `,
        autoClose: true,
        icon: <IconShieldCheck />,
      });
    } catch (error) {
      console.error(error);
      showNotification({
        message: 'Something went wrong',
        color: 'red',
        icon: <IconFaceIdError />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Send pdf"
        size="md"
      >
        <Container size={620} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Send pdf to email
          </Title>
          <Paper
            component="form"
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              {...register('to')}
              label="Email"
              placeholder="Email"
              required
              error={errors.to?.message}
            />
            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Send to pdf
            </Button>
          </Paper>
        </Container>
      </Modal>
      <Button onClick={() => setOpened(true)}>Send resume</Button>
    </>
  );
}
