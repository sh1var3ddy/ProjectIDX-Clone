
import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react";

export const EditorComponent = ()=>{
    const [editorState, setEditorState] = useState({
        theme:null
    });

    async function downloadTheme(){
        const response = await fetch("/Dracula.json");
        const themeData = await response.json();
        setEditorState({...editorState,theme:themeData});
    }

    function handleEditorTheme(editor, monaco){
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    useEffect(()=>{
        downloadTheme();
    },[]);

    return (
        <>
            {  editorState.theme &&
                <Editor
                height={'80vh'}
                width={'100%'}
                defaultLanguage="javascript"
                defaultValue="// Welcome to the playground"
                onMount = {handleEditorTheme}
                options={{
                    fontSize:16,
                    fontFamiliy:'monospace'
                }}
                />
            }
        </>
    )
}