import api from "./api-common";

class UserServices {
    async createUser(data) {
        // {
        //     "email": "pedro@email.com",
        //     "password": "12345678",
        //     "password_confirmation": "12345678",
        //     "first_name": "Pedro",
        //     "last_name": "Pereira",
        //     "genre": "M",
        //     "phone": "5573981829000",
        //     "bio": "nice nice nice",
        //     "region_id": 2,
        //     "state_id": 5,
        //     "city_id": 1953,
        //     "area_id": 1,
        //     "subarea_id": 2,
        //     "title_id": 1,
        //     "organization_id": 5
        // } 

        const response = await api.post("/users",data);

        const { access_token } = response.data;
        return response;
    }

}   
// Route::post('/users', [UserController::class, 'store']);
// Route::post('/login', [AuthController::class, 'logIn']);

// const signIn = useCallback(async ({ email, password }) => {
//     const response = await api.post('/api/auth/login', {
//       email,
//       password,
//     });

//     const { access_token } = response.data;

//     await AsyncStorage.multiSet([
//       ['@GoBarber:token', access_token],
//     ]);

//     setData({ access_token });
//   }, []);

//   const signOut = useCallback(async () => {
//     await AsyncStorage.multiRemove(['@GoBarber:token']);

//     setData({} as AuthState);
//   }, []);


export default new UserServices();