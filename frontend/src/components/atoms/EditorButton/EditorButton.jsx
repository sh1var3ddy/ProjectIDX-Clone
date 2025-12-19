import "./EditorButton.css";

export const EditorButton= ({isActive})=>{


    function handleClick(){
        // Todo
    }

    return (
        <button
            className="editor-button"
            style = {{
                color:isActive?"white":"#3d719bff",
                backgroundColor:isActive?"#3c405fff":"#dfd2d2ff",
                border:isActive?"1px solid #3d719bff":"none",
            }}
            onClick={handleClick}
        >
            file.js
        </button>
    )
}

