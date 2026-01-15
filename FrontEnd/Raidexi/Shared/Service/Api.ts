import axios from "axios";

export const API={
    "Authentication":{
        "Login":"/api/User/Login",
        "Logout":"/api/User/Logout",
        "Register":"/api/User/Register",
        "GetDataUser":"/api/User/GetUserData",
        "LoginWithFirebase":"/api/User/LoginWithFirebase",
        "SaveDataMeasurement":"/api/User/SaveMeasure"
    },
    "Brand":{
        "GetBrandProfile":"/api/MappingSize/brand-profiles",
    }
}
export const BASE_URL="https://localhost:7133"

export const api_Response=async(endpoint:string,method:'GET'|'POST'|'PUT'|'DELETE',data?:any,headers?:any)=>{
    try {
        let response;
        switch (method) {
            case 'GET':
                response=await axios.get(BASE_URL + endpoint,{headers,withCredentials:true});
                break;
            case 'POST':
                response=await axios.post(BASE_URL + endpoint,data,{headers,withCredentials:true});
                break;
            case 'PUT':
                response=await axios.put(BASE_URL + endpoint,data,{headers,withCredentials:true});
                break;
            case 'DELETE':
                response=await axios.delete(BASE_URL + endpoint,{headers,withCredentials:true});
                break;
        }
        return response.data as any;
    } catch (error) {
        throw error;
    }   
}