import { useParams } from "react-router-dom"
import { EditorComponent } from "../molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../atoms/EditorButton/EditorButton";
import { TreeStructure } from "../organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../../store/treeStructureStore";
import { useEditorSocketStore } from "../../store/editorSocketStore";
import { io } from "socket.io-client";
export const ProjectPlayGround = () => {
    const { projectId: projectIdFromParams } = useParams();

    const projectId = useTreeStructureStore((s) => s.projectId);
    const setProjectId = useTreeStructureStore((s) => s.setProjectId);

    const { setEditorSocket } = useEditorSocketStore();



    useEffect(() => {
        if (projectIdFromParams) {
            console.log("projectIdFromParams", projectIdFromParams);
            const editorSocketConn = io(`${import.meta.env.VITE_API_BASE_URL}/editor`, {
                auth: {
                    projectId: projectIdFromParams
                }
            });
            setEditorSocket(editorSocketConn);
            setProjectId(projectIdFromParams);
        }
    }, [projectIdFromParams, setProjectId, setEditorSocket])

    return (
        <>
            <h3>Project Playground</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
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
            </div>
            <EditorButton isActive={true} />
            <EditorButton isActive={false} />


        </>
    )
}