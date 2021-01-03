import SongKickAPI from "./SongKickAPI";

class SongkickSearchAPI extends SongKickAPI {
  constructor() {
    super();
  }
  getArtistByName(name: string) {
    return this.get(`search/artists.json?query=${name}&page=1&per_page=1`);
  }
  getEventsByArtistId(id: string) {
    return this.get(`artists/${id}/calendar.json?`);
  }
}

export default SongkickSearchAPI;
