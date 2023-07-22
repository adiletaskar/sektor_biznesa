import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: null,
  loading: false,
  displayedPages: null,
  text: "",
};

export const getPosts = createAsyncThunk("post/getPosts", async (page) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

export const searchPosts = createAsyncThunk(
  "post/searchPosts",
  async (text) => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?q=${text}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    // changeCurrentPage: (state, { payload }) => {
    //   state.currentPage = payload;
    // },
    changePost: (state, { payload }) => {
      state.posts = payload;
    },
    setDisplayedPages: (state, { payload }) => {
      state.displayedPages = payload;
    },
    changeText: (state, { payload }) => {
      state.text = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(searchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      });
  },
});

export const { changeCurrentPage, changePost, setDisplayedPages, changeText } =
  postSlice.actions;

export default postSlice.reducer;
