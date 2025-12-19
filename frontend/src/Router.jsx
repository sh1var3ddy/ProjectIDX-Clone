import { Route, Routes } from "react-router-dom";
import { CreateProject } from "./components/pages/CreateProject";
import { ProjectPlayGround } from "./components/pages/ProjectPlayground";
export const Router = () =>{
   return (
    <Routes>
        <Route path= "/" element = {<CreateProject/>}/>
        <Route path = "/project/:projectId" element={<ProjectPlayGround/>}/>
      </Routes>
    )
}