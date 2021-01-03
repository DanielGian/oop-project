import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Artist {
    genres: [String!]
    id: ID!
    name: String!
    popularity: Int!
    type: String!
    uri: String!
    images: [Image!]
  }
  type RelatedArtists {
    artists: [Artist!]
  }
`;
