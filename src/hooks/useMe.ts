import { gql } from '@apollo/client';
import { useMeQuery } from '../gql/types';

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      role
    }
  }
`;

export function useMe() {
  return useMeQuery({
    notifyOnNetworkStatusChange: true,
    
  });
}
