import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalsSlice from './modalsSlice.js';

export default configureStore({
  reducer: {
    channelsSlice,
    messagesSlice,
    modalsSlice,
  },
});
