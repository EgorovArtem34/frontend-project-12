import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../hooks/routes';
import useAuth from '../hooks/index.jsx';
import { actions } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import Channels from './ChatComponents/Channels.jsx';
import Messages from './ChatComponents/Messages.jsx';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const headers = auth.getAuthHeader();
  const { addChannels } = actions;
  useEffect(() => {
    const dataContent = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers });
      const { channels, messages, currentChannelId } = data;
      dispatch(addChannels({ channels, currentChannelId }));
      dispatch(addMessages(messages));
    };

    dataContent();
  }, [addChannels, dispatch, headers]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
