import React from 'react';
import { AppNavbar } from '../lib/template/navbar';
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../lib/molecules/header';

const AppContainer = () => {
  return (
    <>
      <AppShell
        padding="md"
        navbar={<AppNavbar />}
        header={<AppHeader/>}
      >
        <Outlet />
      </AppShell>
    </>
  );
};

export default AppContainer;
