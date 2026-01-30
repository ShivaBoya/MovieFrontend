import { io } from 'socket.io-client';

const URL = 'https://moviebackend-2q46.onrender.com';

export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true
});
