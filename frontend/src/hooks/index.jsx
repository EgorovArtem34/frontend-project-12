import { useContext } from 'react';
import { AuthContext, SocketContext } from '../contexts/index.jsx';

export const useAuth = () => useContext(AuthContext);
export const useApi = () => useContext(SocketContext);
