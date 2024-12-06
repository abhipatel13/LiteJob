import { createSlice } from '@reduxjs/toolkit';

const chatWindowSlice = createSlice({
  name: 'chatWindow',
  initialState: { isOpen: false },
  reducers: {
    openChatWindow: (state) => {
      state.isOpen = true;
    },
    closeChatWindow: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openChatWindow, closeChatWindow } = chatWindowSlice.actions;

export default chatWindowSlice.reducer;
