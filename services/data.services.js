import api from "./api-common";

class DataService {
  getAreas() {
    return api.get("/areas");
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
    return api.get(``/organizations/{id}``);
  }

  getCities() {
    return api.get("/cities");
  }

  getCitiesByState(state_id) {
    return api.get(``/cities/{state_id}``);
  }

  //debug
  getURL(){
    return "Axios: " + api.defaults.baseURL;
  }

}

// Route::post('/users', [UserController::class, 'store']);
// Route::post('/login', [AuthController::class, 'logIn']);


export default new DataService();