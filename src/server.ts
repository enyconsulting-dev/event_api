import "./global.js";
import http from "http";
import { WebSocketServer } from "ws";
import app from "./app.js";
import { config } from "./config/index.js";
import { setupSocket } from "./socket/websocket.js";

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const PORT = config.port;

setupSocket(wss);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
