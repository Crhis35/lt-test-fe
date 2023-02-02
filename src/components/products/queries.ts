import { gql } from '@apollo/client';

export const LIST_PRODUCTS_QUERY = gql`
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
export const CREATE_PRODUCT_MUTATION = gql`
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
