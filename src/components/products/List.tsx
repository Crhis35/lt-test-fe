import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Modal,
  ScrollArea,
  Table,
  Tabs,
  Text,
} from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../lib/atoms/spinner';
import { useListProductsQuery } from '../../gql/types';
import { useMe } from '../../hooks/useMe';
import { CreateProductForm } from './Create';
import EmailModal from './Email';

function ListProducts() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { data: userData } = useMe();
  const { data, loading, refetch } = useListProductsQuery({
    variables: {
      input: {
        page: 1,
      },
    },
  });

  const redirect = (path: string) => {
    return () => {
      navigate(path);
    };
  };
  if (loading) return <Spinner />;

  const rows = data?.listProducts.items?.map((item) => (
    <Box
      component="tr"
      key={item.name}
      onClick={redirect(`${item.id}`)}
      sx={(theme) => ({
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.imgUrl} radius={40} />
          <div>
            <Text size="xs" color="dimmed">
              {item.name}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        {item.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
      <td>
        <Badge
          color={item.stock.available > 0 ? 'green' : 'red'}
          variant="outline"
        >
          {item.stock.available > 0 ? 'Available' : 'Empty'}
        </Badge>
      </td>
      <td>
        {new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(item.createdAt))}
      </td>
    </Box>
  ));
  const closeModal = () => {
    setOpened(false);
    refetch();
  };

 
  return (
    <>
      <Helmet>
        <title>Products | Challenge</title>
      </Helmet>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Company"
        size="md"
      >
        <CreateProductForm closeModal={closeModal} />
      </Modal>
      <ScrollArea>
        <Group
          w="100"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Tabs defaultValue="all">
            <Tabs.List>
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="inactive">Inactive</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Box>
            <EmailModal items={data?.listProducts.items}/>
            {userData?.me.role === 'ADMIN' && (
              <Button onClick={() => setOpened(true)}> Create Company</Button>
            )}
          </Box>
        </Group>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

export default ListProducts;
