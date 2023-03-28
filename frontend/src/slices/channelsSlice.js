import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: {
    channels: [],
    currentChannelId: null,
  },
};

const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channelsData.channels = channels;
      state.channelsData.currentChannelId = currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channelsData.channels.push(payload);
    },
    setCurrentChannel: (state, { payload }) => {
      state.channelsData.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      const filteredChannels = state.channelsData.channels.filter((c) => c.id !== payload.id);
      if (state.channelsData.currentChannelId === payload.id) {
        state.channelsData.currentChannelId = defaultChannelId;
      }
      state.channelsData.channels = filteredChannels;
    },
    renameChannel: (state, { payload }) => {
      const newState = state.channelsData.channels.map((channel) => (channel.id === payload.id
        ? payload : channel));
      state.channelsData.channels = newState;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
