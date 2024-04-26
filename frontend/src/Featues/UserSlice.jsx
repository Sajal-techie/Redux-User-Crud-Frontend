import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from './UserApi';
import { jwtDecode } from "jwt-decode";

let userjson = localStorage.getItem('jwtTokenUser');
let adminjson = localStorage.getItem('jwtTokenAdmin');
let decodedToken
if (userjson){
    decodedToken = jwtDecode(userjson)
}
let adminDecodedToken
if (adminjson){
    adminDecodedToken = jwtDecode(adminjson)
}
const initialState = {
        user:decodedToken ? decodedToken.username : null,
        superuser:adminDecodedToken?adminDecodedToken.username:null,
        is_loading:false,
}
export const userRegistration = createAsyncThunk('user/register', async(userData)=>{
    const responce = await userApi.register(userData)
    console.log('slice responce thunk', responce);
    return responce
} )
export const userLogin = createAsyncThunk('user/login', async(userData)=>{
    try {
        const responce = await userApi.login(userData);
        console.log(responce,'responceeeeeeeeeeeeeeeeeee')
        if (responce.status === 400){
            return responce
        }
        const accessToken = responce.access;
        const decodeToken = jwtDecode(accessToken);
        console.log(decodeToken,'frm userlogin slice',accessToken)
        if (responce?.loginType === 'ADMIN_LOGIN'){
            localStorage.setItem('jwtTokenAdmin',accessToken);
        } else if (responce?.loginType === 'USER_LOGIN'){
            localStorage.setItem('jwtTokenUser',accessToken);
        }
        return decodeToken;
    } catch (err){
        console.log(err,'userlogin error in slice');
        throw 'invalid user'
    }

})

export const UserSlice = createSlice(
    
{
  name: 'users',
  initialState,
  reducers: {
    // login: (state, action) => {
    //     console.log(state,action,'inreducers login ');
    //         state.user = action.payload;
    //         console.log(state.user,'in login reducer');
    // },
    logout : (state)=>{
            state.user = null;
            state.superuser = null;
    },
    upateUser:(state , action) => {
        state.user = action.payload;
    },
},
    extraReducers:(builder)=>{
        builder
       .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action.payload,'in extra reducers fulfilled');
        if (action.payload.is_admin){
            state.superuser = action.payload.username
        }else{
            state.user = action.payload.username
        }
        state.is_loading = false
        console.log(state.user,state.is_loading);
       })
       .addCase(userLogin.rejected, (state, action) => {
        console.log(action.payload,'error in addcase slice');
        state.error = action.error
        state.is_loading = false
        console.log(state.error);
       })
       .addCase(userLogin.pending, (state) =>{
        state.is_loading = true
        state.user = null
        console.log(state,'oending');
       })
       .addCase(userRegistration.fulfilled, (state, action) => {
           state.is_loading = false
           console.log(action.payload,state.is_loading,'in user registere fulfiled');

       })
       .addCase(userRegistration.rejected, (state, action) => {
        console.log(action.payload,'error in addcase slice resgsiter');
        state.error = action
        state.is_loading = false
        console.log(state.error,state.is_loading,'in rejected');
       })
        .addCase(userRegistration.pending,(state)=>{
            state.is_loading = true
            console.log(state.is_loading,'in pending');
        })       
    }
})


export const { logout,upateUser } = UserSlice.actions;


export default UserSlice.reducer;