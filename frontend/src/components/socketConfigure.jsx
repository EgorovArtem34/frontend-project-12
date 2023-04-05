import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { actions } from '../slices/channelsSlice.js';

const CheckResponse = (response) => {
  const { t } = useTranslation();
  if (response.status !== 'ok') {
    toast.error(t('toast.network'));
  }
};

const socketConfigure = (socket) => {
  const addNewMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      CheckResponse(response);
    });
  };
  const addNewChannel = (chanel) => {
    socket.emit('newChannel', chanel, (response) => {
      CheckResponse(response);
    });
  };
  const removeChannel = (chanelId) => {
    socket.emit('removeChannel', chanelId, (response) => {
      CheckResponse(response);
    });
  };
  const renameChannel = (chanel) => {
    socket.emit('renameChannel', chanel, (response) => {
      CheckResponse(response);
    });
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
