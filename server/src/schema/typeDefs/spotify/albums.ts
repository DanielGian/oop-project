import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Albums {
    items: [Album!]
  }
  type Album {
    id: ID!
    name: String!
    images: [Image!]
  }
`;
