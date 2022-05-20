import BaseRequests from "./base-requests";

class PetRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "pet";
    console.log(this.uri);
  }
}

export default PetRequests;
