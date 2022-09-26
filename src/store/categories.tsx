import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
export const addCategorie = createAsyncThunk(
    "categories/addCategorie",
    async (categorie: string, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const updates = { categories: [] as string[] };
        updates[`categories`] = [categorie, ...state.categories];
        update(ref(database), updates);
        return categorie;
    }
);
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const snapshot = await get(ref(database, `/categories`));
        if (snapshot.exists()) {
            const response = snapshot.val();
            return response;
        }
    }
);
export const removeCategory = createAsyncThunk(
    "categories/removeCategory",
    async (index: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const categories = [...state.categories];
        categories.splice(index, 1);
        console.log(categories);

        const updates = { categories: [] as string[] };
        updates["categories"] = [...categories];
        await update(ref(database), updates);
        return categories;
    }
);
const categories = createSlice({
    name: "categories",
    initialState: [] as string[],
    extraReducers: (builder) => {
        builder.addCase(addCategorie.fulfilled, (state: string[], action) => {
            state.push(action.payload);
        });
        builder.addCase(
            fetchCategories.fulfilled,
            (state: string[], action) => action.payload
        );
        builder.addCase(
            removeCategory.fulfilled,
            (state: string[], action) => action.payload
        );
    },
    reducers: {
        add(state: string[], action: { payload: { categorie: string } }) {
            state.push(action.payload.categorie);
        },
        replace(state: string[], action: { payload: string[] }) {
            state = action.payload;
            console.log(state);
        },
    },
});
export default categories;
export const categoriesActions = categories.actions;
