import axios from "axios";

class BaseRequests {
  constructor(uri) {
    this.uri = uri;
  }

  getAll = async (token) => {
    let response;
    try {
      response = await axios.get(`${this.uri}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error(err.message || "No se pudo obtener la lista");
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
      throw new Error(err.message || "No se pudo crear el documento");
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
      throw new Error(
        err.message || "No se pudo obtener los datos del documento solicitado"
      );
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
      throw new Error(err.message || "No se pudo actualizar el documento");
    }
  };

  deleteOne = async (idUser, token) => {
    let response;
    try {
      response = await axios.get(`${this.uri}/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error(
        err.message || "No se pudo eliminar al documento solicitado"
      );
    }
  };
}

export default BaseRequests;
