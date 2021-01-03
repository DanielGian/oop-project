import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

class SongKickAPI extends RESTDataSource {
  API: string;
  constructor() {
    super();
    this.baseURL = "https://api.songkick.com/api/3.0/";
  }
  willSendRequest(request: RequestOptions) {
    request.params.append("apikey", this.context.key);
  }
}

export default SongKickAPI;
