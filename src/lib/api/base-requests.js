import axios from 'axios';

class BaseRequests {
  constructor(uri) {
    this.uri = uri;
  }

  getAll = async (token, params) => {
    let response;
    try {
      response = await axios.get(`${this.uri}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      return response.data;
    } catch (err) {
      // throw new Error(err.message  "No se pudo obtener la lista");
      return err.response.data;
    }
  };

  createOne = async (token, data) => {
    let response;
    try {
      response = await axios.post(`${this.uri}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      // throw new Error(err.message  "No se pudo crear el documento");
      return err.response.data;
    }
  };

  getOne = async (idUser, token) => {
    let response;
    try {
      response = await axios.get(`${this.uri}/${idUser}`, {
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

  updateOne = async (idUser, data, token) => {
    let response;
    try {
      response = await axios.patch(`${this.uri}/${idUser}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      // throw new Error(err.message  "No se pudo actualizar el documento");
      return err.response.data;
    }
  };

  deleteOne = async (idUser, token) => {
    let response;
    try {
      response = await axios.delete(`${this.uri}/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      // throw new Error(
      //   err.message || "No se pudo eliminar al documento solicitado"
      // );
      return err.response.data;
    }
  };
}

export default BaseRequests;
