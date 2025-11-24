import { createSlice } from "@reduxjs/toolkit";
import { getSiteMedia, saveSiteMedia } from "./sitemediaThunk";


const initialState = {
media: null,
loading: false,
error: null,
};


const sitemediaSlice = createSlice({
name: "sitemedia",
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(getSiteMedia.pending, (state) => {
state.loading = true;
})
.addCase(getSiteMedia.fulfilled, (state, action) => {
state.loading = false;
state.media = action.payload;
})
.addCase(getSiteMedia.rejected, (state, action) => {
state.loading = false;
state.error = action.error.message;
})
.addCase(saveSiteMedia.pending, (state) => {
state.loading = true;
})
.addCase(saveSiteMedia.fulfilled, (state, action) => {
state.loading = false;
state.media = action.payload;
})
.addCase(saveSiteMedia.rejected, (state, action) => {
state.loading = false;
state.error = action.error.message;
});
},
});


export default sitemediaSlice.reducer;