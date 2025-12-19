import { createProjectService, getProjectTreeService } from "../services/projectService.js";
export const  createProjectController = async (req,res)=>{
    const projectId = await createProjectService();
    return res.json({message:'project created successfully', data:projectId});
}

export const getProjectTree =async(req,res)=>{
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({message:'project tree retrieved successfully', data:tree, success:true});
}
