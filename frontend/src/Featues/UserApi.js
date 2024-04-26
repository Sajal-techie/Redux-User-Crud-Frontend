import axios  from "axios"
export const BaseUrl = 'http://127.0.0.1:8000/'

export const userApi = {
    register : async (userData) =>{
        try{
            const response = await axios.post(BaseUrl + 'signup/',userData);
            console.log(response.data,'from userAPi data');
            return response.data
        }catch(err){
            console.log(Object.values(err.response.data)[0],'from userAPi');
            return Object.values(err.response.data)[0]
        }
    },
    login : async (userData) =>{
        const response = await axios.post(`${BaseUrl}token/`,userData)
        console.log(response.data,'login response from userAPi');
        return response.data
    }
}