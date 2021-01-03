import { gql } from "apollo-server-express";

export const typeDef = gql`
  type User {
    id: ID!
    email: String!
    lists: [List]
  }
`;
//note lists field currently not working and will always display none.
//future ToDo: join lists column to user in psql
