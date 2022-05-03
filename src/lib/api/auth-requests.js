import axios from "axios";

class AuthRequests {
  constructor(uri) {
    this.uri = uri + "user";
  }

  async signUp(data) {
    console.log(this.uri);
    let response;
    try {
      response = await axios.post(`${this.uri}/signup`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async logIn(data) {
    let response;
    try {
      response = await axios.post(`${this.uri}/login`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async forgotPassword(data) {
    let response;
    try {
      response = await axios.post(`${this.uri}/forgotPassword`, data);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async resetPassword(recoverToken, data) {
    let response;
    try {
      response = await axios.patch(
        `${this.uri}/resetPassword/${recoverToken}`,
        data
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async updatePassword(token, data) {
    let response;
    try {
      response = await axios.post(`${this.uri}/updateMyPassword`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async getMe(token) {
    let response;
    try {
      response = await axios.get(`${this.uri}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async updateMe(token, data) {
    let response;
    try {
      response = await axios.patch(`${this.uri}/updateMe`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async deleteMe(token, data) {
    let response;
    try {
      response = await axios.delete(`${this.uri}/deleteMe`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export default AuthRequests;
