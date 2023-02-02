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
  ActionIcon,
} from '@mantine/core';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CreateCompanyInput,
  useCreateCompanyMutation,
  CreateCompanyMutation,
} from '../../gql/types';
import {
  IconTrash,
  IconShieldCheck,
  IconFaceIdError,
} from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

const validationSchema = z.object({
  name: z.string(),
  address: z.string(),
  imgUrl: z.string(),
  nationalId: z.string(),
  phoneNumber: z.array(
    z.object({
      countryCode: z.string(),
      number: z.string(),
      ext: z.string().optional(),
    })
  ),
});
interface CreateCompanyFormProps {
  closeModal: () => void;
}
export function CreateCompanyForm({ closeModal }: CreateCompanyFormProps) {
  const [createCompany, { loading }] = useCreateCompanyMutation({
    onCompleted: (data: CreateCompanyMutation) => {
      console.log({ data });
      const {
        createCompany: { ok, item, error },
      } = data;
      closeModal();
      if (!ok) {
        showNotification({
          title: 'Something went wrong',
          message: error,
          color: 'red',
          icon: <IconFaceIdError />,
        });
      }
      if (ok && item) {
        showNotification({
          title: 'Create successfully',
          message: `Company ${item.name}`,
          autoClose: true,
          icon: <IconShieldCheck />,
        });
      }
    },
    onError: (error) => {
      console.log({ error });

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyInput>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
      address: 'Colombia',
      imgUrl: 'https://picsum.photos/id/911/200/300',
      nationalId: '1232434',
      phoneNumber: [
        {
          countryCode: '+57',
          number: '333333333',
        },
      ],
    },
  });

  const phoneNumberArray = useFieldArray({
    control,
    name: 'phoneNumber',
  });
  const onSubmit = (input: CreateCompanyInput) => {
    createCompany({
      variables: { input },
    });
  };

  const phoneNumbersItem = phoneNumberArray.fields.map((item, idx) => (
    <Group key={`phoneNumber-${idx}-${item.id}`} mt="xs">
      <TextInput
        label="Country code"
        placeholder="Country code"
        withAsterisk
        sx={{ flex: 1 }}
        {...register(`phoneNumber.${idx}.countryCode`)}
      />
      <TextInput
        label="Number"
        placeholder="Number"
        withAsterisk
        sx={{ flex: 1 }}
        {...register(`phoneNumber.${idx}.number`)}
      />
      <TextInput
        label="extension"
        placeholder="extension"
        withAsterisk
        sx={{ flex: 1 }}
        {...register(`phoneNumber.${idx}.ext`)}
      />

      <ActionIcon color="red" onClick={() => phoneNumberArray.remove(idx)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Container size={620} my={40}>
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
          {...register('name')}
          label="Name"
          placeholder="name"
          required
          error={errors.name?.message}
        />
        <TextInput
          {...register('address')}
          label="Name"
          placeholder="name"
          required
          error={errors.address?.message}
        />
        <TextInput
          {...register('nationalId')}
          label="National ID"
          placeholder="nationalId"
          required
          error={errors.nationalId?.message}
        />
        <TextInput
          {...register('imgUrl')}
          label="Image URL"
          placeholder="Image URL"
          required
          error={errors.imgUrl?.message}
        />
        {phoneNumbersItem}
        <Group position="center" mt="md">
          <Button
            onClick={() =>
              phoneNumberArray.append({
                countryCode: '',
                number: '',
                ext: '',
              })
            }
          >
            Add phone number
          </Button>
        </Group>
        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Create company
        </Button>
      </Paper>
    </Container>
  );
}
