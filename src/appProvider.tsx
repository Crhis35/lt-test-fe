import React, { Suspense } from 'react';
import Spinner from './lib/atoms/spinner';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ThemeProvider from './lib/theme/theme.provider';
import { NotificationsProvider } from '@mantine/notifications';

export default function AppProvider() {
  return (
    <ThemeProvider>
      <NotificationsProvider position="bottom-center">
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />;
        </Suspense>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
