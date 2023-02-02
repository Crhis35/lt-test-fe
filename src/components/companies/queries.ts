import { gql } from "@apollo/client";

export const COMPANIES_QUERY = gql`
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
export const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany($input: CreateCompanyInput!){
  createCompany(input: $input){
    ok
    error
    item{
      id
      nationalId
      name
      imgUrl
      phoneNumber{
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