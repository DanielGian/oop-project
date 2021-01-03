import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1/";
  }

  willSendRequest(request: RequestOptions) {
    const promise = async () => {
      const tok = await this.context.token;
      request.headers.set("Content-Type", "application/json");
      request.headers.set("Accept", "application/json");
      request.headers.set("Authorization", tok);
    };
    return promise();
  }
}

export default SpotifyAPI;
