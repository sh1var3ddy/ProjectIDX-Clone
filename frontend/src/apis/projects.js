import axios from "axios";
import axiosInstance from "../config/axiosConfig"
export const createProjectApi = async ()=>{
    try{
        const response = await axiosInstance.post("/api/v1/projects");
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}