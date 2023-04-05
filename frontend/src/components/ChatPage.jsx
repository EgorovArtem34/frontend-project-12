import React, { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import routes from '../hooks/routes';
import { useAuth } from '../hooks/index.jsx';
import { actions } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import Channels from './ChatComponents/Channels.jsx';
import Messages from './ChatComponents/Messages.jsx';
import Modal from './Modal.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const headers = auth.getAuthHeader();
  const { addChannels, setCurrentChannel } = actions;
  useEffect(() => {
    const dataContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { channels, messages, currentChannelId } = data;
        dispatch(addChannels(channels));
        dispatch(setCurrentChannel(currentChannelId));
        dispatch(addMessages(messages));
      } catch (err) {
        if (!err.isAxiosError) {
          toast.error(t('toast.unknownErr'));
        } else {
          toast.error(t('toast.network'));
        }
      }
    };

    dataContent();
  }, [addChannels, dispatch, headers, setCurrentChannel, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <Modal />
      </div>
    </div>
  );
};

export default ChatPage;
