import { useContext } from 'react';
import contexts from '../contexts/index.jsx';

const { AuthContext, SocketContext } = contexts;
const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export default { useAuth, useSocket };
