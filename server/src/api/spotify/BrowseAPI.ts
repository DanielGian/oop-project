import SpotifyAPI from "./SpotifyAPI";
import { RequestOptions } from "apollo-datasource-rest";

class BrowseAPI extends SpotifyAPI {
  constructor() {
    super();
  }
  willSendRequest(request: RequestOptions) {
    return super.willSendRequest(request);
  }

  async getCategoryById(id: string) {
    return this.get(`browse/categories/${id}`);
  }
  async getAllCategories() {
    return this.get(`browse/categories`);
  }
}

export default BrowseAPI;
