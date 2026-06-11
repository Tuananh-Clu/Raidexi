import axios from "axios";

export const API={
    "Authentication":{
        "Login":"/api/User/Login",
        "Logout":"/api/User/Logout",
        "Register":"/api/User/Register",
        "GetDataUser":"/api/User/GetUserData",
        "LoginWithFirebase":"/api/User/LoginWithFirebase",
        "SaveDataMeasurement":"/api/User/SaveMeasure",
        "SaveMeasureBrandSize":"/api/User/SaveMeasureBrandSize",
        "GetBrandMeasurements":"/api/User/GetBrandSizeMeasure",
        "UpdateUserData":"/api/User/UpdateUser",
        "SaveCustomProfile":"/api/User/SaveCustomProfileForUser",
        "GetCustomProfileForUser":"/api/User/GetCustomProfileForUser",
        "UpdateCustomProfile":"/api/User/UpdateCustomProfile",
        "ResetPassword":"/api/User/ResetPassword",
        "ConfirmResetPassword":"/api/User/ConfirmResetPassword",
    },
    "Brand":{
        "GetBrandProfile":"/api/MappingSize/brand-profiles",
        "CreateBrandProfileRequest":"/api/MappingSize/brand-profile-requests",
        "GetBrandProfileRequests":"/api/MappingSize/brand-profile-requests",
        "UpdateBrandProfileRequestStatus":"/api/MappingSize/brand-profile-requests/{id}/status",
        "AddBrandSizeChart":"/api/MappingSize/brand-size-chart",
        "GetBrandSizeChartsForId":"/api/MappingSize/brand-size-chart",
        "MyBrandProfileRequests": "/api/MappingSize/my-brand-profile-requests",
    },
    "AnalysisDataMeasurement":{
        "GetSuggestSize":"/api/AnalysisDataMeasure/AISuggest",
        "GetDataFromImage":"/api/AnalysisDataMeasure/GetDataFromImage",
        "AnalyseFromImage":"/api/AnalysisDataMeasure/AnalyseImage",
        "UploadChart":"/api/AnalysisDataMeasure/UploadChart",
    },
    "Mail":{
        "SendMail":"/api/Mail/send",
    }
}
const rawBaseUrl = process.env.NEXT_PUBLIC_RAIDEXI_API_BASE_URL || "http://localhost:5000";

export const BASE_URL = rawBaseUrl.replace(/\/+$/, "");

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
