import BaseRequests from "./base-requests";

class ProductRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + "product";
    console.log(this.uri);
  }
}

export default ProductRequests;
