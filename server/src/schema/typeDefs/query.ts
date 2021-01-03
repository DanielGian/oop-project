import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Query {
    search(name: String!): Search
    artist(id: ID!): Artist!
    relatedArtists(id: ID!): RelatedArtists
    albums(id: ID!): Albums
    me: User
    myLists: [List]
    artistSearch(name: String!): SongkickSearch
    eventSearch(id: ID!): SongkickSearch
    eventByName(name: String!): SongkickSearch
  }
`;
