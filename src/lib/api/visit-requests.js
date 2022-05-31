import BaseRequests from "./base-requests";

class VisitRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "visit";
    console.log(this.uri);
  }
}

export default VisitRequests;
