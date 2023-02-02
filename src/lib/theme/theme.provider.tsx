import * as React from 'react';

import { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={
        {
          // colorScheme: 'dark',
        }
      }
    >
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
