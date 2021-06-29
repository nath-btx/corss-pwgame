import { createContext } from 'react'
import {io} from "socket.io-client"

export const socket = io.connect('https://cross-pwgame.herokuapp.com');
export const SocketContext = createContext();
