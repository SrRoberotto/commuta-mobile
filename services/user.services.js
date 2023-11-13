import api from "./api-common";

class UserServices {
    async createUser(data) {

        const response = await api.post("/users",data);

        // const { access_token } = response.data;

        return response;
    }

    async getMe(){
        const response = await api.get("/me");
        
        return response;
    }

    
    async getUserByID(id){
        const response = await api.get(`/users/${id}`);
        
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