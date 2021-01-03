import { gql } from "apollo-boost";

export const searchQuery = gql`
  query SearchQuery($name: String!) {
    search(name: $name) {
      artists {
        href
        ...ItemsFragment
      }
    }
  }
  fragment ItemsFragment on Artists {
    items {
      id
      name
      ...ImagesFragment
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
