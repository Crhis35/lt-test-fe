import React, { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

const AppContainer = lazy(() => import('../components/app'));
const ListProducts = lazy(() => import('../components/products/List'));
const ListCompanies = lazy(() => import('../components/companies/List'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        path: '/',
        element: <ListCompanies />,
      },
      {
        path: 'company/:id',
        element: <div>Company</div>,
      },
      {
        path: 'products',
        element: <ListProducts />,
      },
      {
        path: 'products/:id',
        element: <div>Product</div>,
      },
    ],
  },
]);
