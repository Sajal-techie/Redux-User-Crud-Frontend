import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseUrl } from './Constant';
import { jwtDecode } from "jwt-decode";

const initialState = {
        users:[{'name':'sajal',password:'12345678'}]
}

export const UserSlice = createSlice(
    
{
  name: 'users',
  initialState,
  reducers: {

  loginUser :  (state,action) =>{
        console.log(action);
        axios.post(`${BaseUrl}token/`,{
            "username":action.payload.name,
            "password":action.payload.password,
            
        })
        .then((res)=>{
            console.log(res.data);
            state = jwtDecode(res.data.access)
            console.log(state);
            return res.data;
        })
        .catch((err)=>{
            console.log('something went wrond',err);
        })
  },
  

}
})


export const { loginUser } = UserSlice.actions;


export default UserSlice.reducer;