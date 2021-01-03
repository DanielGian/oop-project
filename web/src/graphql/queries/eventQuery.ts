import { gql } from "apollo-boost";

export const eventQuery = gql`
  query EventByName($name: String!) {
    eventByName(name: $name) {
      resultsPage {
        results {
          ...EventFragment
        }
      }
    }
  }
  fragment EventFragment on SongkickResult {
    event {
      id
      displayName
      uri
      type
      ...VenueFragment
      ...LocationFragment
      ...StartFragment
      ...PerformanceFragment
    }
  }

  fragment VenueFragment on SongkickEvent {
    venue {
      id
      displayName
    }
  }
  fragment LocationFragment on SongkickEvent {
    location {
      city
    }
  }
  fragment StartFragment on SongkickEvent {
    start {
      time
      date
    }
  }
  fragment PerformanceFragment on SongkickEvent {
    performance {
      id
      ...ArtistFragment
    }
  }
  fragment ArtistFragment on Performance {
    artist {
      id
      displayName
    }
  }
`;
