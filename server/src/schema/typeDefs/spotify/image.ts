import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Image {
    height: Int!
    width: Int!
    url: String!
  }
`;
