import express from "express";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import chokidar from "chokidar";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";

const app = express();
// Logic for handling HTTP requests
const server = createServer(app);

// Logic for handling WebSocket connections
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    }
});

const editorNamespace = io.of("/editor"); // /editor is the namespace for editor

editorNamespace.on("connection", (socket) => {
    // console.log("editor connected", socket.handshake.auth['projectId']);
    let projectId = socket.handshake.auth['projectId'];

    console.log("Project id recieved after connection : ", projectId);

    if (projectId) {

        var watcher = chokidar.watch(`projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"), /* Ignores node_modules */
            persistent: true, /* Keeps the process running until application is closed */
            awaitWriteFinish: {
                stabilityThreshold: 2000, /* Ensures stability of file before emitting event */
                pollInterval: 1000, /* Polling interval in ms */
                ignoreInitial: true /* Ignores initial events */
            }
        });
        watcher.on("all", (event, path) => {
            console.log(event, path);
        })
    }
    handleEditorSocketEvents(socket);
    socket.on("disconnect", async () => {
        if (watcher) {
            await watcher.close();
        }
        console.log("editor disconnected");
    })
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middleware for handling WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected");
});

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
    res.status(200).json({ "message": "pong" });
})
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})