import api from "./api-common";
//import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthServices {
// Route::post('/users', [UserController::class, 'store']);
// Route::post('/login', [AuthController::class, 'logIn']);

    async signIn(data) {
    const response = await api.post('/login', data);

    

    //console.log("Resposta:\n",token)

    // await AsyncStorage.multiSet([
    //   ['@Commuta:token', access_token],
    // ]);

    // setData({ access_token });
    return response
  }

  async signOut () {
    await AsyncStorage.multiRemove(['@Commuta:token']);

    setData({});
  }
}

export default new AuthServices();