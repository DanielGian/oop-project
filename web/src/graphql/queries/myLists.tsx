import { gql } from "apollo-boost";
export const myLists = gql`
  query myLists {
    myLists {
      id
      title
      ids
    }
  }
`;
