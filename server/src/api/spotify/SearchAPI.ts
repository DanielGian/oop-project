import { RequestOptions } from "apollo-datasource-rest";
import SpotifyAPI from "./SpotifyAPI";

class SearchAPI extends SpotifyAPI {
  constructor() {
    super();
  }
  willSendRequest(request: RequestOptions) {
    return super.willSendRequest(request);
  }
  async getArtistsByName(name: string) {
    return await this.get(`search?q=${name}&type=artist&limit=5`);
  }
}

export default SearchAPI;
