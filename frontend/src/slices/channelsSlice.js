import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: {
    channels: [],
    currentChannelId: null,
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channelsData.channels = channels;
      state.channelsData.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.channelsData.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
