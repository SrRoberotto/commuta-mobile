import api from "./api-common";

class DataServices {
  getAreas() {
    return api.get("/areas");
  }

  getCargos() {
    return api.get("/titles");
  }

  getSubAreas() {
    return api.get("/subareas");
  }

  getStates() {
    return api.get("/states");
  }

  getOrganizations() {
    return api.get("/organizations");
  }

  getOrganizationsById(id) {
    return api.get(`/organizations/${id}`);
  }

  getCities() {
    return api.get("/cities");
  }

  getCitiesByState(state_id) {
    return api.get(`/cities/${state_id}`);
  }

  //debug
  getURL(){
    return "Axios: " + api.defaults.baseURL;
  }

}

export default new DataServices();