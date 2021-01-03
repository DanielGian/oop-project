import { gql } from "apollo-boost";
export const artistQuery = gql`
  query ArtistQuery($id: ID!) {
    artist(id: $id) {
      id
      name
      genres
      popularity
      uri
      ...ImagesFragment
    }
  }
  fragment ImagesFragment on Artist {
    images {
      height
      width
      url
    }
  }
`;
