import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  todoList: [],
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {setIsLoggedIn, setUser, resetState, setLoading, setTodoList} =
  userSlice.actions;
export default userSlice.reducer;
