import BaseRequests from "./base-requests";

class ClientRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "client";
    console.log(this.uri);
  }
}

export default ClientRequests;
