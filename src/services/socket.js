import SocketIO from 'socket.io-client'
import { API_BASE } from '../const'

let socket = SocketIO(API_BASE)

export default socket
