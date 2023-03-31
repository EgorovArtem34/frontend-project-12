import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import init from './init';

const socket = io();

const app = async () => {
  const vdom = document.getElementById('root');
  vdom.classList.add('h-100');
  const root = ReactDOM.createRoot(vdom);
  document.querySelector('html').classList.add('h-100');
  document.querySelector('body').classList.add('h-100', 'bg-light');
  root.render(await init(socket));
};

app();
