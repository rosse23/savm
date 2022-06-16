import BaseRequests from './base-requests';
import axios from 'axios';
class ProductRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + 'product';
    console.log(this.uri);
  }
  mostDemandProductsCategory = async (token) => {
    let response;
    try {
      response = await axios.get(`${this.uri}/mostDemandProductsCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      // throw new Error(
      //   err.message  "No se pudo obtener los datos del documento solicitado"
      //   );
      return err.response.data;
    }
  };
  mostSoldProducts = async (token) => {
    let response;
    try {
      response = await axios.get(`${this.uri}/mostSoldProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      // throw new Error(
      //   err.message  "No se pudo obtener los datos del documento solicitado"
      //   );
      return err.response.data;
    }
  };
}

export default ProductRequests;
