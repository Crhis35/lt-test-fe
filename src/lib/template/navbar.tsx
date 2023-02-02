import React, { useState } from 'react';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from '@mantine/core';
import { IconHome2, Icon, IconBuildingStore } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  to: string;
}

function NavbarLink({ icon: Icon, label, to }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <NavLink to={to}>
        {({ isActive }) => (
          <UnstyledButton
            className={cx(classes.link, { [classes.active]: isActive })}
          >
            <Icon stroke={1.5} />
          </UnstyledButton>
        )}
      </NavLink>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Companies', to: '/' },
  {
    icon: IconBuildingStore,
    label: 'Products',
    to: '/products',
  },
];

export function AppNavbar() {
  const links = mockdata.map((link) => (
    <NavbarLink {...link} key={link.label} />
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Center>App</Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
