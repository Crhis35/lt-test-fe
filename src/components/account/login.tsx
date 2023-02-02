import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: LogInInput!) {
    login(input: $input) {
      ok
      token
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;
