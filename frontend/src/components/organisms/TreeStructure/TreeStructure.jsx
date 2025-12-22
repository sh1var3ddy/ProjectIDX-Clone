import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { useProjectTree } from "../../../hooks/apis/queries/useProjectTree";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";


export const TreeStructure = () => {
    const { projectId } = useParams();
    const setTreeStructure = useTreeStructureStore((s) => s.setTreeStructure);
    const setProjectId = useTreeStructureStore((s) => s.setProjectId);

    useEffect(() => {
        if (projectId) setProjectId(projectId);
    }, [projectId, setProjectId]);

    const { projectTree, isLoading, isError, error } = useProjectTree(projectId);

    useEffect(() => {
        if (projectTree) setTreeStructure(projectTree);
    }, [projectTree, setTreeStructure]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {String(error?.message ?? error)}</div>;

    return (
        <div>
            <TreeNode fileFolderData={projectTree} />

        </div>
    );
};
