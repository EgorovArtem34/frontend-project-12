import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { actions } from '../slices/channelsSlice.js';

const promosifySocket = (socket, type, data) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit(type, data, (err, response) => (err ? reject(err) : resolve(response)));
});

const socketConfigure = (socket) => {
  const addNewMessage = (message) => promosifySocket(socket, 'newMessage', message);
  const addNewChannel = (channel) => promosifySocket(socket, 'newChannel', channel);
  const removeChannel = (chanelId) => promosifySocket(socket, 'removeChannel', chanelId);
  const renameChannel = (channel) => promosifySocket(socket, 'renameChannel', channel);

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(actions.addChannel(channel));
    store.dispatch(actions.setCurrentChannel(channel.id));
  });
  socket.on('removeChannel', (chanelId) => {
    store.dispatch(actions.removeChannel(chanelId));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(actions.renameChannel(channel));
  });

  return {
    addNewMessage, addNewChannel, removeChannel, renameChannel,
  };
};
export default socketConfigure;
