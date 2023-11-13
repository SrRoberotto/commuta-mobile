import api from "./api-common";
//import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthServices {
// Route::post('/users', [UserController::class, 'store']);
// Route::post('/login', [AuthController::class, 'logIn']);

  async signIn(data) {
    const response = await api.post('/login', data);

    return response
  }

  storeToken(token){
    api.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    console.log("Token guardado: ",token)
  }

  async signOut () {
    await AsyncStorage.multiRemove(['@Commuta:token']);

    setData({});
  }
}

export default new AuthServices();