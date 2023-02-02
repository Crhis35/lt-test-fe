import React from 'react';
import { Box, Loader } from '@mantine/core';

const Spinner = () => {
  return (
    <Box
      w="100"
      h="100"
      display="flex"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader />
    </Box>
  );
};

export default Spinner;
