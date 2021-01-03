import { gql } from "apollo-server-express";

export const typeDef = gql`
  type SongkickSearch {
    resultsPage: ResultPage
  }
  type ResultPage {
    results: SongkickResult
  }
  type SongkickResult {
    artist: [SongkickArtist]
    event: [SongkickEvent]
  }
  type SongkickArtist {
    id: ID
    displayName: String
  }
  type SongkickEvent {
    id: ID
    displayName: String
    uri: String
    type: String
    venue: Venue
    location: Location
    start: Start
    performance: [Performance]
  }
  type Venue {
    id: ID
    displayName: String
  }
  type Location {
    city: String
  }
  type Start {
    time: String
    date: String
  }
  type Performance {
    id: ID
    artist: SongkickArtist
  }
`;
