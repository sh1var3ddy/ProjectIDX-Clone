import { useParams } from "react-router-dom"
import { EditorComponent } from "../molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../atoms/EditorButton/EditorButton";
import { TreeStructure } from "../organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../../store/treeStructureStore";
export const ProjectPlayGround = () => {
    const { projectId: projectIdFromParams } = useParams();

    const projectId = useTreeStructureStore((s) => s.projectId);
    const setProjectId = useTreeStructureStore((s) => s.setProjectId);


    useEffect(() => {
        if (projectIdFromParams) setProjectId(projectIdFromParams);
    }, [projectIdFromParams, setProjectId])

    return (
        <>
            Project Id: {projectId}
            {projectId &&
                <div
                    style={{
                        backgroundColor: "#333254",
                        paddingRight: "10px",
                        paddingTop: "0.3vh",
                        minWidth: "250px",
                        maxWidth: "25%",
                        height: "99.7vh",
                        overflow: "auto"
                    }}
                >
                    <TreeStructure />
                </div>
            }
            <EditorComponent />
            <EditorButton isActive={true} />
            <EditorButton isActive={false} />


        </>
    )
}