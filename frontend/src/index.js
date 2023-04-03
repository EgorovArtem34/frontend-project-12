import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import init from './init';

const app = async () => {
  const socket = io();
  const vdom = document.getElementById('root');
  const root = ReactDOM.createRoot(vdom);
  root.render(await init(socket));
};

app();
