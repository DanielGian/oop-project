import { gql } from "apollo-boost";

export const artistSearchQuery = gql`
  query ArtistSearchQuery($name: String!) {
    artistSearch(name: $name) {
      resultsPage {
        results {
          artist {
            id
          }
        }
      }
    }
  }
`;
