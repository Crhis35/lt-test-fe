import React, { useState } from 'react';
import {
  Avatar,
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
import { useListCompaniesQuery } from '../../gql/types';
import Spinner from '../../lib/atoms/spinner';
import { useMe } from '../../hooks/useMe';
import { CreateCompanyForm } from './Create';

function ListCompanies() {
  const navigate = useNavigate();
  const { data: userData } = useMe();
  const [opened, setOpened] = useState(false);

  const { data, loading, refetch } = useListCompaniesQuery({
    variables: {
      input: {
        page: 1,
      },
    },
  });
  const closeModal = () => {
    setOpened(false);
    refetch();
  };
  const redirect = (path: string) => {
    return () => {
      navigate(path);
    };
  };
  if (loading) return <Spinner />;

  const rows = data?.listCompanies.items?.map((item) => (
    <Box
      component="tr"
      key={item.name}
      onClick={redirect(`company/${item.id}`)}
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
            <Text size="sm" weight={500}>
              NIT: {item.nationalId}
            </Text>
            <Text size="xs" color="dimmed">
              {item.name}
            </Text>
          </div>
        </Group>
      </td>
      <td>{`${item.phoneNumber[0].countryCode} ${item.phoneNumber[0].number} ${
        item.phoneNumber[0]?.ext || ''
      }`}</td>
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

  return (
    <>
      <Helmet>
        <title>Companies | Challenge</title>
      </Helmet>
      <ScrollArea>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Create Company"
          size="md"
        >
          <CreateCompanyForm closeModal={closeModal} />
        </Modal>
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
          {userData?.me.role === 'ADMIN' && (
            <Box>
              <Button onClick={() => setOpened(true)}> Create Company</Button>
            </Box>
          )}
        </Group>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Companies</th>
              <th>Phone number</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

export default ListCompanies;
