import { gql } from "apollo-boost";
export const login = gql`
  mutation login($email: String!) {
    login(email: $email) {
      id
      email
    }
  }
`;
