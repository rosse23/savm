import BaseRequests from './base-requests';

class ActivityRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + 'activity';
    console.log(this.uri);
  }
}

export default ActivityRequests;
