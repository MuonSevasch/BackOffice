import axios from "axios";

const baseURL = "http://25.48.59.169:8080/api";

class Api {
  async login(username, password) {
    let data = {};
    await axios
      .post(`${baseURL}/login`, { username, password })
      .then(response => {
        data = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }

  async logout() {
    let data = {};
    await axios
      .post(`${baseURL}/logout`)
      .then(response => {
        data = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }


  async getAllLoot(route) {
    let allLoot = [];
    await axios
      .get(`${baseURL}/${route}`)
      .then(function(response) {
        allLoot = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return allLoot;
  }

  async getLoot(route, id) {
    let loot = {};
    await axios
      .get(`${baseURL}/${route}/${id}`)
      .then(function(response) {
        loot = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return loot;
  }

  async deleteLoot(route, id) {
    let loot = {};
    await axios
      .delete(`${baseURL}/${route}/${id}`)
      .then(function(response) {
        loot = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return loot;
  }

  async getAllFood(route) {
    let allLoot = [];
    await axios
      .get(`http://25.48.59.169:8080/public/api/${route}`)
      .then(function(response) {
        allLoot = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return allLoot;
  }

  async addLoot(root, info) {
    let data = {};
    await axios
      .post(`${baseURL}/${root}`, info)
      .then(response => {
        data = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }

  async updateLoot(root, info, id) {
    let data = {};
    await axios
      .put(`${baseURL}/${root}/${id}`, info)
      .then(response => {
        data = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }
}

export default new Api();
