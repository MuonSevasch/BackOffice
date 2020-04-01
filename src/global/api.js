import axios from "axios";

const baseURL = "http://25.48.59.169:8080/api";

class Api {
  async login(username, password) {
    let data = {};
    await axios
      .post(`${baseURL}/login`)
      .then(response => {
        data = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }

  async getAllFood() {
    let allFood = [];
    await axios
      .get(`${baseURL}/food`)
      .then(function(response) {
        allFood = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return allFood;
  }
  async getProductsRequired() {
    let data = {};
    await axios
      .get(`${baseURL}/userForm/productsRequired`)
      .then(function(response) {
        console.log(response);
        data = response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return data;
  }

  async sendInfo(info) {
    let data = {};
    await axios
      .post(`${baseURL}/userform`, info)
      .then(response => {
        data = response;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }
}

export default new Api();
