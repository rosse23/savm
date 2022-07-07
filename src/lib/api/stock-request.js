import BaseRequests from './base-requests';

class StockRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + 'stock';
    console.log(this.uri);
  }
}

export default StockRequests;
