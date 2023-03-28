import { createSlice } from '@reduxjs/toolkit';
import { actions } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.removeChannel, (state, { payload }) => {
      const channelId = payload.id;
      const filteredMessages = state.messages.filter((m) => m.channelId !== channelId);
      state.messages = filteredMessages;
    });
  },
});

export const { addMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
