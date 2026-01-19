import fs from "fs/promises";

export const handleEditorSocketEvents = (socket) => {
    socket.on("writeFile", async ({ data, pathToFile }) => {
        try {
            const response = await fs.writeFile(pathToFile, data);
            socket.emit("writeFileSuccess", {
                value: "File written successfully",
                path: pathToFile
            })


        } catch (error) {
            console.log(error);
            socket.emit("writeFileError", {
                value: "Error writing the file",
                path: pathToFile
            })
        }
    })

    socket.on("createFile", async ({ pathToFileOfFolder }) => {
        const isFileAlreadyPresent = await fs.stat(pathToFileOfFolder);
        if (isFileAlreadyPresent) {
            socket.emit("createFileError", {
                value: "File already exists",
                path: pathToFileOfFolder
            })
            return;

        }
        try {
            const response = await fs.writeFile(pathToFileOfFolder, "");
            socket.emit("createFileSuccess", {
                value: "File created successfully",
                path: pathToFileOfFolder
            })
        } catch (error) {
            console.log("Error creating file");
            socket.emit("createFileError", {
                value: "Error creating file",
                path: pathToFileOfFolder
            })
        }
    })

    socket.on("readFile", async ({ pathToFileOrFolder }) => {
        try {
            // console.log("Path to file or folder : ", pathToFileOrFolder);
            const response = await fs.readFile(pathToFileOrFolder);
            // console.log(response.toString());
            socket.emit("readFileSuccess", {
                value: response.toString(),
                path: pathToFileOrFolder
            })
        } catch (error) {
            console.log("Error reading file");
            socket.emit("readFileError", {
                value: "Error reading file",
                path: pathToFileOrFolder
            })
        }
    })

    socket.on("deleteFile", async ({ pathToFile }) => {
        try {
            const response = await fs.unlink(pathToFile);
            socket.emit("deleteFileSuccess", {
                value: "File deleted successfully",
                path: pathToFile
            })
        } catch (error) {
            console.log("Error deleting file");
            socket.emit("deleteFileError", {
                value: "Error deleting file",
                path: pathToFile
            })
        }
    })

    socket.on("renameFile", async ({ pathToFile }) => {
        try {
            const response = await fs.rename(pathToFile);
            socket.emit("renameFileSuccess", {
                value: "File renamed successfully",
                path: pathToFile
            })
        } catch (error) {
            console.log("Error renaming file");
            socket.emit("renameFileError", {
                value: "Error renaming file",
                path: pathToFile
            })
        }
    })

    socket.on("createFolder", async ({ pathToFolder }) => {
        try {
            const response = await fs.mkdir(pathToFolder);
            socket.emit("createFolderSuccess", {
                value: "Folder created successfully",
                path: pathToFolder
            })
        } catch (error) {
            console.log("Error creating folder");
            socket.emit("createFolderError", {
                value: "Error creating folder",
                path: pathToFolder
            })
        }
    })

    socket.on("deleteFolder", async ({ pathToFolder }) => {
        try {
            const response = await fs.rmdir(pathToFolder, { recursive: true });
            socket.emit("deleteFolderSuccess", {
                value: "Folder deleted successfully",
                path: pathToFolder
            })
        } catch (error) {
            console.log("Error deleting folder");
            socket.emit("deleteFolderError", {
                value: "Error deleting folder",
                path: pathToFolder
            })
        }
    })

    socket.on("renameFolder", async ({ pathToFolder }) => {
        try {
            const response = await fs.rename(pathToFolder);
            socket.emit("renameFolderSuccess", {
                value: "Folder renamed successfully",
                path: pathToFolder
            })
        } catch (error) {
            console.log("Error renaming folder");
            socket.emit("renameFolderError", {
                value: "Error renaming folder",
                path: pathToFolder
            })
        }
    })


};