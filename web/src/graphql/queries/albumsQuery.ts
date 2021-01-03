import { gql } from "apollo-boost";
export const albumsQuery = gql`
  query AlbumsQuery($id: ID!) {
    albums(id: $id) {
      items {
        id
        name
        ...ImagesFragment
      }
    }
  }
  fragment ImagesFragment on Item {
    images {
      height
      width
      url
    }
  }
`;
