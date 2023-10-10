import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";


const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,// reducer la gia tri tra ve cua ham boardsSlice trong file src/redux/boardsSlice.js
  }
})

export default store
