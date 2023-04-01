import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { actions } from '../slices/channelsSlice.js';

const socketConfigure = (socket) => {
  const addNewMessage = (message) => {
    socket.emit('newMessage', message);
  };
  const addNewChannel = (chanel) => {
    socket.emit('newChannel', chanel);
  };
  const removeChannel = (chanelId) => {
    socket.emit('removeChannel', chanelId);
  };
  const renameChannel = (chanel) => {
    socket.emit('renameChannel', chanel);
  };

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
