import { createSlice } from "@reduxjs/toolkit";

// const filterReducer = (state = "ALL", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };
const filterSlice = createSlice({
  name: "filter",
  initialState: { view: "ALL" },
  reducers: {
    filterChange(state, action) {
      state.filter = action.payload;
    },
  },
});

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

export const { filterChange } = filterSlice.actions;

export default filterSlice.reducer;
