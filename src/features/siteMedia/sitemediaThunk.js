import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const getSiteMedia = createAsyncThunk(
"sitemedia/get",
async (_, { rejectWithValue }) => {
try {
const res = await fetch(`${baseUrl}/sitemedia`);
if (!res.ok) throw new Error("Error obteniendo SiteMedia");
return await res.json();
} catch (error) {
return rejectWithValue(error.message);
}
}
);


export const saveSiteMedia = createAsyncThunk(
"sitemedia/save",
async (formData, { rejectWithValue }) => {
try {
const res = await fetch(`${baseUrl}/sitemedia`, {
method: "POST",
body: formData,
});
if (!res.ok) throw new Error("Error guardando SiteMedia");
return await res.json();
} catch (error) {
return rejectWithValue(error.message);
}
}
);