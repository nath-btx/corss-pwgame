import { createContext } from 'react'
import {io} from "socket.io-client"

export const socket = io.connect('http://192.168.1.20:3000');
export const SocketContext = createContext();
