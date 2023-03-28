import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import init from './init';

const socket = io();

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init(socket));
};

app();
