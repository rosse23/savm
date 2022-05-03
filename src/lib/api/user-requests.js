import BaseRequests from "./base-requests";

class UserRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "user";
    console.log(this.uri);
  }
}

export default UserRequests;
