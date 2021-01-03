import { gql } from "apollo-boost";
export const me = gql`
  query me {
    me {
      email
      id
    }
  }
`;
