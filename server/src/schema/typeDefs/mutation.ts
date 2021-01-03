import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Mutation {
    register(email: String!): Boolean!
    login(email: String!): User
    logout: Boolean!
    createList(title: String!): Boolean!
    deleteList(listId: ID!): ID
    addToList(itemIds: [ID!]!, listId: ID!): [ID]
    removeFromList(itemIds: [ID!]!, listId: ID!): [ID]
  }
`;
