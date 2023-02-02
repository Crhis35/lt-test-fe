import React from 'react';
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  NumberInput,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CreateProductMutation,
  CreateProductInput,
  useCreateProductMutation,
  useListCompaniesQuery,
} from '../../gql/types';
import { IconShieldCheck, IconFaceIdError } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import Dropdown from '../../lib/atoms/select';

const validationSchema = z.object({
  companyId: z.string(),
  name: z.string(),
  price: z.number(),
  imgUrl: z.string(),
  stock: z.object({
    available: z.number(),
    max: z.number(),
    min: z.number(),
    transit: z.number(),
    reservation: z.number(),
  }),
});

interface CreateProductFormProps {
  closeModal: () => void;
}

export function CreateProductForm({ closeModal }: CreateProductFormProps) {
  const { data } = useListCompaniesQuery({
    variables: {
      input: {
        page: 1,
      },
    },
  });
  const [createProduct, { loading }] = useCreateProductMutation({
    onCompleted: (data: CreateProductMutation) => {
      const {
        createProduct: { ok, item, error },
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
          message: `Product ${item.name}`,
          autoClose: true,
          icon: <IconShieldCheck />,
        });
      }
    },
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
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateProductInput>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      companyId: '7e999947-2aa5-49bd-8467-f33c6ae5bfb0',
      name: 'Product',
      price: 400,
      imgUrl: 'https://picsum.photos/id/711/200/300',
      stock: {
        available: 3,
        max: 5,
        min: 1,
        transit: 2,
        reservation: 1,
      },
    },
  });
  const onSubmit = (input: CreateProductInput) => {
    createProduct({
      variables: { input },
    });
  };
  console.log(errors);
  return (
    <Container size={620} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create product
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
        <NumberInput
          onChange={(value: number) => setValue('price', value)}
          label="Price"
          placeholder="price"
          required
          type="number"
          error={errors.price?.message}
        />
        <TextInput
          {...register('imgUrl')}
          label="Image Urk"
          placeholder="imagerl"
          required
          error={errors.imgUrl?.message}
        />
        <NumberInput
          onChange={(value: number) => setValue('stock.min', value)}
          label="Min"
          placeholder="Min"
          required
          type="number"
          error={errors.stock?.min?.message}
        />
        <NumberInput
          onChange={(value: number) => setValue('stock.max', value)}
          label="Max"
          placeholder="Max"
          required
          type="number"
          error={errors.stock?.max?.message}
        />
        <NumberInput
          label="Transit"
          placeholder="Transit"
          required
          type="number"
          error={errors.stock?.transit?.message}
          onChange={(value: number) => setValue('stock.transit', value)}
        />
        <NumberInput
          onChange={(value: number) => setValue('stock.reservation', value)}
          label="Reservation"
          placeholder="Reservation"
          required
          type="number"
          error={errors.stock?.reservation?.message}
        />
        <NumberInput
          onChange={(value: number) => setValue('stock.available', value)}
          label="Available"
          placeholder="Available"
          required
          type="number"
          error={errors.stock?.available?.message}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Company"
              placeholder="company"
              data={
                data?.listCompanies.items?.map((item) => ({
                  image: item.imgUrl,
                  label: item.name,
                  value: item.id,
                  description: item.nationalId,
                })) ?? []
              }
              {...field}
            />
          )}
          name="companyId"
        />
        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Create product
        </Button>
      </Paper>
    </Container>
  );
}
