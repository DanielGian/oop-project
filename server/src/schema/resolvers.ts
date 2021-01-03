import { IResolvers } from "graphql-tools";
import { User } from "../entity/User";
import { List } from "../entity/List";
import { getConnection } from "typeorm";

export const resolvers: IResolvers = {
  Query: {
    eventByName: async (_, { name }, { dataSources }) => {
      console.log("hello");
      const res = await dataSources.songkickSearchAPI.getArtistByName(name);
      const id = res.resultsPage.results.artist[0].id;
      console.log(id);
      return dataSources.songkickSearchAPI.getEventsByArtistId(id);
    },
    search: async (_, { name }, { dataSources }) =>
      await dataSources.searchAPI.getArtistsByName(name),
    artistSearch: async (_, { name }, { dataSources }) =>
      await dataSources.songkickSearchAPI.getArtistByName(name),
    eventSearch: async (_, { id }, { dataSources }) =>
      await dataSources.songkickSearchAPI.getEventsByArtistId(id),
    artist: async (_, { id }, { dataSources }) =>
      await dataSources.artistAPI.getArtistById(id),
    relatedArtists: async (_, { id }, { dataSources }) =>
      await dataSources.artistAPI.getRelatedArtistsById(id),
    albums: async (_, { id }, { dataSources }) =>
      await dataSources.artistAPI.getAlbumsById(id),
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      return User.findOne(req.session.userId);
    },
    myLists: async (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      const lists = await getConnection()
        .createQueryBuilder()
        .select("list")
        .from(List, "list")
        .where(`"userId" = :id`, { id: req.session.userId })
        .getMany();
      return lists;
    }
  },
  Mutation: {
    register: async (_, { email }) => {
      await User.create({
        email
      }).save();
      return true;
    },
    login: async (_, { email }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      req.session.userId = user.id;

      return user;
    },
    logout: async (_, __, { req, res }) => {
      await new Promise(res => req.session.destroy(() => res()));
      res.clearCookie("connect.sid");
      return true;
    },
    createList: async (_, { title }, { req }) => {
      const user = await User.findOne(req.session.userId);
      if (!user) {
        console.log("error: user is not logged in");
        return false;
      }
      const list = await List.create({ title }).save();
      list.user = user;
      list.title = title;
      list.save();
      return true;
    },
    addToList: async (_, { itemIds, listId }) => {
      const list = await List.findOne(listId);
      if (!list) {
        console.log("error: list does not exist");
        return null;
      }
      await list.ids.push(...itemIds);
      list.save();
      return itemIds;
    },
    removeFromList: async (_, { itemIds, listId }) => {
      const list = await List.findOne(listId);
      if (!list) {
        console.log("error: list does not exist");
        return null;
      }
      const newList = list.ids.filter(x => !itemIds.includes(x));
      list.ids = newList;
      list.save();
      return itemIds;
    },
    deleteList: async (_, { listId }) => {
      await List.delete(listId);
      return listId;
    }
  }
};
