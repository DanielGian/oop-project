import { typeDef as list } from "./list";
import { typeDef as mutation } from "./mutation";
import { typeDef as query } from "./query";
import { typeDef as artistSearch } from "./songkick/search";
import { typeDef as albums } from "./spotify/albums";
import { typeDef as artist } from "./spotify/artist";
import { typeDef as image } from "./spotify/image";
import { typeDef as search } from "./spotify/search";
import { typeDef as user } from "./user";
export const typeDefs = [
  query,
  mutation,
  artist,
  user,
  search,
  artistSearch,
  albums,
  image,
  list
];
