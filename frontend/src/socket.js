import { io } from 'socket.io-client';

// Basic socket.io client configured to connect to the backend.
// The backend URL can be customized through environment variables in the future.
const socket = io();

export default socket;
