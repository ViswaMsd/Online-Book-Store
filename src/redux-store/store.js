import { configureStore, createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: { darkMode: false },
  reducers: {
    darkModeHandler(state) {
      state.darkMode = !state.darkMode;
    },
  },
});
const allBooksSlice = createSlice({
  name: "allBooks",
  initialState: { books: [], count: 0 },
  reducers: {
    initialFetch(state, action) {
      console.log("initial fetch...");
      state.books = action.payload;
      state.count = action.payload.length;
    },
    addBook(state, action) {
      state.books.push(action.payload);
      state.count++;
    },
    deletBook(state, action) {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
      state.count--;
    },
    updateBook(state, action) {
      state.books = state.books.map((book) => {
        if (book._id == action.payload._id) return action.payload;
        return book;
      });
    },
  },
});
const viewSlice = createSlice({
  name: "view",
  initialState: { gridView: true },
  reducers: {
    gridViewHandler(state) {
      state.gridView = true;
    },
    listViewHandler(state) {
      state.gridView = false;
    },
  },
});
const modalSlice = createSlice({
  name: "modal",
  initialState: { open: false, book: {} },
  reducers: {
    openModal(state, action) {
      state.book = action.payload;
      state.open = true;
    },
    closeModal(state) {
      state.book = {};
      state.open = false;
    },
    upDateModal(state, action) {
      state.book = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
    allBooks: allBooksSlice.reducer,
    view: viewSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
export const darkModeActions = darkModeSlice.actions;
export const allBooksActions = allBooksSlice.actions;
export const viewActions = viewSlice.actions;
export const modalActions = modalSlice.actions;
