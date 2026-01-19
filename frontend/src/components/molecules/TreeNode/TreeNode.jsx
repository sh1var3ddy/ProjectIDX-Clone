import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const TreeNode = ({
    fileFolderData
}) => {

    const [visibility, setVisibility] = useState({});
    const editorSocket = useEditorSocketStore((s) => s.editorSocket);


    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })

    }

    function handleDoubleClick(fileFolderData) {
        console.log("fileFolderData", fileFolderData);
        editorSocket.emit("readFile", {
            pathToFileOrFolder: fileFolderData.path
        });
    }



    return (
        (fileFolderData &&
            <div
                style={{
                    paddingLeft: "15px",
                    color: "white"
                }}
            >
                {fileFolderData.children ? (
                    <button onClick={() => toggleVisibility(fileFolderData.name)}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            backgroundColor: "transparent",
                            color: "white",
                            paddingTop: "15px",
                            fontSize: "16px"
                        }}
                    >
                        {visibility[fileFolderData.name] ?
                            <IoIosArrowDown style={{ height: "10px", width: "10px" }} /> :
                            <IoIosArrowForward style={{ height: "10px", width: "10px" }} />
                        }
                        {fileFolderData.name}
                    </button>
                ) : (
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <FileIcon extension={fileFolderData.name.split(".").pop()} />
                        <p
                            style={{
                                paddingTop: "5px",
                                fontSize: "15px",
                                cursor: "pointer",
                                marginLeft: "5px",
                                color: "white",
                                backgroundColor: "transparent"
                            }}
                            onDoubleClick={() => handleDoubleClick(fileFolderData)}
                        >
                            {fileFolderData.name}
                        </p>
                    </div>
                )}
                {visibility[fileFolderData.name] &&
                    fileFolderData.children.map((child) => (
                        <TreeNode
                            key={child.name}
                            fileFolderData={child}
                        />
                    ))
                }
            </div>
        )
    )
}