import axiosInstance from "../config/axiosConfig";

export const pingApi = async ()=>{
    try{
        const response = await axiosInstance.get("/api/v1/ping");
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}