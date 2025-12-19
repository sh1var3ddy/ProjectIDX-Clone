import { useParams } from "react-router-dom"
import { EditorComponent } from "../molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../atoms/EditorButton/EditorButton";

export const ProjectPlayGround = () =>{
    const {projectId} = useParams();

    return (
        <>
            Project Id: {projectId}
            <EditorComponent/>
            <EditorButton isActive={true}/>
            <EditorButton isActive={false}/>
        </>
    )
}