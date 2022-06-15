import BaseRequests from './base-requests';
import axios from 'axios';

class VisitRequests extends BaseRequests {
  constructor(uri) {
    super(uri);
    this.uri = this.uri + 'visit';
    console.log(this.uri);
  }

  showMedicinesByPet = async (idUser, token) => {
    let response;
    try {
      response = await axios.get(`${this.uri}/showMedicinesByPet/${idUser}`, {
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

export default VisitRequests;
