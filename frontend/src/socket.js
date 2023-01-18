import { io } from "socket.io-client"

//const socket = io("ws://localhost:5000");
export const socket = io('ws://localhost:8080', { transports : ['websocket'] });
//export const socket = io('ws://192.168.31.131:8080', { transports : ['websocket'] });