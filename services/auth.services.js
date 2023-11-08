import api from "./api-common";

class AuthServices {
// Route::post('/users', [UserController::class, 'store']);
// Route::post('/login', [AuthController::class, 'logIn']);

    const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });

    const { access_token } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', access_token],
    ]);

    setData({ access_token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token']);

    setData({} as AuthState);
  }, []);


export default new AuthServices();