import { createContext } from 'react'
import {io} from "socket.io-client"
import {URL} from '@env'

export const socket = io.connect(URL || 'http://localhost:3000');
export const SocketContext = createContext();
