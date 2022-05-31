import BaseRequests from "./base-requests";

class EstheticRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "esthetic";
    console.log(this.uri);
  }
}

export default EstheticRequests;
