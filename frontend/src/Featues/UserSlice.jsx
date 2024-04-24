import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseUrl,userApi } from './UserApi';
import { jwtDecode } from "jwt-decode";

let userjson = localStorage.getItem('jwtTokenUser');
let decodedToken
if (userjson){
    decodedToken = jwtDecode(userjson)
}
const initialState = {
        user:decodedToken ? decodedToken.username : null,
        superuser:null,
        error:(null)
}

export const userLogin = createAsyncThunk('user/login', async(userData)=>{
    try {
        const responce = await userApi.login(userData);
        console.log(responce,'responceeeeeeeeeeeeeeeeeee')
        if (responce.status === 400){
            return responce
            throw responce.message;
        }
        const accessToken = responce.access;
        const decodeToken = jwtDecode(accessToken);
        console.log(decodeToken,'frm userlogin slice',accessToken)
        if (decodeToken.is_admin){
            localStorage.setItem('jwtTokenAdmin',accessToken);
        } else{
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
    login: (state, action) => {
        console.log(state);
        if (!action.payload.is_admin) {
            state.user = action.payload;
            state.superuser = null;
        } else {
            state.superuser = action.payload;
            state.user = null;

        }
    },
    logout : (state)=>{
        if (state.user){
            state.user = null;
        }else{
            state.superuser = null;
        }
    },
},
    extraReducers:(builder)=>{
        builder
       .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.username
        state.token = action.payload.is_admin
        console.log(state.user,state.token);
        
       })
       .addCase(userLogin.rejected, (state, action) => {
        console.log(action.payload,'error in addcase slice');
        state.error = action.error
        console.log(state.error);
       })

    }
})


export const { login,logout } = UserSlice.actions;


export default UserSlice.reducer;