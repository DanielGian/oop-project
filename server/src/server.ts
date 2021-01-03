import * as _ from "./env";
import { ApolloServer } from "apollo-server-express";

import * as rp from "request-promise";

import ArtistAPI from "./api/spotify/ArtistAPI";
import SearchAPI from "./api/spotify/SearchAPI";
import { typeDefs } from "./schema/typeDefs/typeDefs";
import { resolvers } from "./schema/resolvers";
import SongkickSearchAPI from "./api/songkick/SearchAPI";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const songkick_key = process.env.SONGKICK_KEY;

    const key = songkick_key;
    const authOptions = {
      method: "POST",
      uri: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${client_id}:${client_secret}`).toString("base64")
      },
      form: {
        grant_type: "client_credentials"
      },
      json: true
    };

    const getToken = () => {
      return rp(authOptions)
        .then(parsedBody => {
          const tokType = parsedBody.token_type;
          const tokVal = parsedBody.access_token;
          return `${tokType} ${tokVal}`;
        })
        .catch(err => {
          console.log(err);
        });
    };
    const token = getToken();
    return { req, res, token, key };
  },

  dataSources: () => {
    return {
      searchAPI: new SearchAPI(),
      artistAPI: new ArtistAPI(),
      songkickSearchAPI: new SongkickSearchAPI()
    };
  }
});
