
import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";

export const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null
    });

    const { editorSocket } = useEditorSocketStore((s) => s);
    const { activeFileTab, setActiveFileTab } = useActiveFileTabStore((s) => s);

    async function downloadTheme() {
        const response = await fetch("/Dracula.json");
        const themeData = await response.json();
        setEditorState({ ...editorState, theme: themeData });
    }

    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    editorSocket?.on("readFileSuccess", (data) => {
        console.log("Read file success", data);
        setActiveFileTab(data.path, data.value, data.path.split(".").pop());
    })

    useEffect(() => {
        downloadTheme();
    }, []);

    return (
        <>
            {editorState.theme &&
                <Editor
                    height={'80vh'}
                    width={'100%'}
                    value={activeFileTab?.value ? activeFileTab.value : "// Welcome to playground"}
                    language={activeFileTab?.extension ? activeFileTab.extension : "javascript"}
                    onMount={handleEditorTheme}
                    options={{
                        fontSize: 16,
                        fontFamily: 'monospace'
                    }}
                />
            }
        </>
    )
}