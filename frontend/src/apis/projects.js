import axios from "axios";
import axiosInstance from "../config/axiosConfig"
export const createProjectApi = async () => {
    try {
        const response = await axiosInstance.post("/api/v1/projects");
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getProjectTree = async ({ projectId }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/projects/${projectId}/tree`);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}