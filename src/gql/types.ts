import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  nationalId: Scalars['String'];
  phoneNumber: Array<PhoneNumber>;
  products?: Maybe<Array<Product>>;
  updatedAt: Scalars['DateTime'];
};

export type CompanyInputType = {
  address: Scalars['String'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  nationalId: Scalars['String'];
  phoneNumber: Array<PhoneNumberInputType>;
  products?: InputMaybe<Array<ProductInputType>>;
};

export type CompanyPaginationInput = {
  page?: Scalars['Int'];
};

export type CompanyPaginationOutput = {
  __typename?: 'CompanyPaginationOutput';
  error?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Company>>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Float']>;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  username: Scalars['String'];
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateCompanyInput = {
  address: Scalars['String'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  nationalId: Scalars['String'];
  phoneNumber: Array<PhoneNumberInputType>;
};

export type CreateCompanyOutput = {
  __typename?: 'CreateCompanyOutput';
  error?: Maybe<Scalars['String']>;
  item?: Maybe<Company>;
  ok: Scalars['Boolean'];
};

export type CreateProductInput = {
  companyId: Scalars['ID'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  stock: ProductStockInpuType;
};

export type CreateProductOutput = {
  __typename?: 'CreateProductOutput';
  error?: Maybe<Scalars['String']>;
  item?: Maybe<Product>;
  ok: Scalars['Boolean'];
};

export type LogInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createCompany: CreateCompanyOutput;
  createProduct: CreateProductOutput;
  login: LoginOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationLoginArgs = {
  input: LogInInput;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  countryCode: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  number: Scalars['String'];
};

export type PhoneNumberInputType = {
  countryCode: Scalars['String'];
  ext?: InputMaybe<Scalars['String']>;
  number: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  company: Company;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  stock: ProductStock;
  updatedAt: Scalars['DateTime'];
};

export type ProductInputType = {
  company: CompanyInputType;
  imgUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  stock: ProductStockInpuType;
};

export type ProductPaginationInput = {
  page?: Scalars['Int'];
};

export type ProductPaginationOutput = {
  __typename?: 'ProductPaginationOutput';
  error?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Product>>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Float']>;
};

export type ProductStock = {
  __typename?: 'ProductStock';
  available: Scalars['Float'];
  max: Scalars['Float'];
  min: Scalars['Float'];
  reservation: Scalars['Float'];
  transit: Scalars['Float'];
};

export type ProductStockInpuType = {
  available: Scalars['Float'];
  max: Scalars['Float'];
  min: Scalars['Float'];
  reservation: Scalars['Float'];
  transit: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  listCompanies: CompanyPaginationOutput;
  listProducts: ProductPaginationOutput;
  me: User;
};


export type QueryListCompaniesArgs = {
  input: CompanyPaginationInput;
};


export type QueryListProductsArgs = {
  input: ProductPaginationInput;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type LoginMutationVariables = Exact<{
  input: LogInInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null } };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type ListCompaniesQueryVariables = Exact<{
  input: CompanyPaginationInput;
}>;


export type ListCompaniesQuery = { __typename?: 'Query', listCompanies: { __typename?: 'CompanyPaginationOutput', error?: string | null, ok: boolean, items?: Array<{ __typename?: 'Company', id: string, imgUrl: string, address: string, name: string, createdAt: any, nationalId: string, phoneNumber: Array<{ __typename?: 'PhoneNumber', countryCode: string, ext?: string | null, number: string }>, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null }> | null } };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'CreateCompanyOutput', ok: boolean, error?: string | null, item?: { __typename?: 'Company', id: string, nationalId: string, name: string, imgUrl: string, address: string, createdAt: any, phoneNumber: Array<{ __typename?: 'PhoneNumber', countryCode: string, ext?: string | null, number: string }> } | null } };

export type ListProductsQueryVariables = Exact<{
  input: ProductPaginationInput;
}>;


export type ListProductsQuery = { __typename?: 'Query', listProducts: { __typename?: 'ProductPaginationOutput', ok: boolean, totalPages?: number | null, totalResults?: number | null, items?: Array<{ __typename?: 'Product', id: string, name: string, imgUrl: string, price: number, createdAt: any, company: { __typename?: 'Company', id: string, name: string, nationalId: string }, stock: { __typename?: 'ProductStock', available: number, max: number, min: number, reservation: number, transit: number } }> | null } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'CreateProductOutput', ok: boolean, error?: string | null, item?: { __typename?: 'Product', id: string, name: string, imgUrl: string, price: number, stock: { __typename?: 'ProductStock', transit: number, max: number, min: number, available: number } } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, username: string, role: UserRole } };


export const LoginDocument = gql`
    mutation login($input: LogInInput!) {
  login(input: $input) {
    ok
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const ListCompaniesDocument = gql`
    query listCompanies($input: CompanyPaginationInput!) {
  listCompanies(input: $input) {
    items {
      id
      imgUrl
      address
      name
      createdAt
      nationalId
      phoneNumber {
        countryCode
        ext
        number
      }
      products {
        id
        name
      }
    }
    error
    ok
  }
}
    `;

/**
 * __useListCompaniesQuery__
 *
 * To run a query within a React component, call `useListCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCompaniesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useListCompaniesQuery(baseOptions: Apollo.QueryHookOptions<ListCompaniesQuery, ListCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCompaniesQuery, ListCompaniesQueryVariables>(ListCompaniesDocument, options);
      }
export function useListCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCompaniesQuery, ListCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCompaniesQuery, ListCompaniesQueryVariables>(ListCompaniesDocument, options);
        }
export type ListCompaniesQueryHookResult = ReturnType<typeof useListCompaniesQuery>;
export type ListCompaniesLazyQueryHookResult = ReturnType<typeof useListCompaniesLazyQuery>;
export type ListCompaniesQueryResult = Apollo.QueryResult<ListCompaniesQuery, ListCompaniesQueryVariables>;
export const CreateCompanyDocument = gql`
    mutation createCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    ok
    error
    item {
      id
      nationalId
      name
      imgUrl
      phoneNumber {
        countryCode
        ext
        number
      }
      address
      createdAt
    }
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const ListProductsDocument = gql`
    query listProducts($input: ProductPaginationInput!) {
  listProducts(input: $input) {
    ok
    totalPages
    totalResults
    items {
      id
      name
      imgUrl
      price
      company {
        id
        name
        nationalId
      }
      stock {
        available
        max
        min
        reservation
        transit
      }
      createdAt
    }
  }
}
    `;

/**
 * __useListProductsQuery__
 *
 * To run a query within a React component, call `useListProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useListProductsQuery(baseOptions: Apollo.QueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
      }
export function useListProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
        }
export type ListProductsQueryHookResult = ReturnType<typeof useListProductsQuery>;
export type ListProductsLazyQueryHookResult = ReturnType<typeof useListProductsLazyQuery>;
export type ListProductsQueryResult = Apollo.QueryResult<ListProductsQuery, ListProductsQueryVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    ok
    item {
      id
      name
      stock {
        transit
        max
        min
        available
      }
      imgUrl
      price
    }
    error
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    username
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;