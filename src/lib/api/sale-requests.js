import BaseRequests from "./base-requests";

class SaleRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "sale";
    console.log(this.uri);
  }
}

export default SaleRequests;
