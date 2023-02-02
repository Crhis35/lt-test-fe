import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Text,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogInInput, useLoginMutation, LoginMutation } from '../../gql/types';
import { isLoggedInVar, authToken } from '../../apollo';
import { LOCAL_STORAGE_TOKEN } from '../../constants';
import { showNotification } from '@mantine/notifications';
import { IconFaceIdError, IconShieldCheck } from '@tabler/icons-react';

const validationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be a leats 6 characters' }),
});

interface LoginFormProps {
  closeModal: () => void;
}

export function LoginForm({ closeModal }: LoginFormProps) {
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      isLoggedInVar(true);
      authToken(token);
      closeModal();
      showNotification({
        title: `Welcome back!`,
        message: `Login successfully`,
        autoClose: true,
        icon: <IconShieldCheck />,
      });
    }
  };
  const [login, { loading }] = useLoginMutation({
    onCompleted,
    onError: (error) => {
      showNotification({
        title: 'Something went wrong',
        message: error.message,
        color: 'red',
        icon: <IconFaceIdError />,
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInput>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: 'test@test.com',
      password: '123qwe',
    },
  });
  const onSubmit = (input: LogInInput) => {
    login({
      variables: { input },
    });
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
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
          {...register('email')}
          label="Email"
          placeholder="you@mantine.dev"
          required
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register('password')}
          placeholder="Your password"
          required
          mt="md"
          error={errors.password?.message}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
          <Anchor<'a'>
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
