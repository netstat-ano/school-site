import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { AnyAction } from "redux";
import { get, ref } from "firebase/database";
import { database } from "../firebase";
export const addCategorie = createAsyncThunk(
    "categories/addCategorie",
    async (categorie: string, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const updates = { categories: [] as string[] };
        updates[`categories`] = [categorie, ...state.categories];
    }
);
const categories = createSlice({
    name: "categories",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(addCategorie.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    },
    reducers: {
        add(state: string[], action: { payload: { categorie: string } }) {
            state.push(action.payload.categorie);
        },
        replace(state: string[], action: { payload: string[] }) {
            state = action.payload;
        },
    },
});
export default categories;
export const categoriesActions = categories.actions;

// const addCategorie = (): ThunkAction<void, RootState, unknown, AnyAction> => {
//     return async (getState, dispatch) => {
//         const categories = getState() as RootState;
//     };
// };

const fetchCategories = (): ThunkAction<
    void,
    RootState,
    unknown,
    AnyAction
> => {
    return async (dispatch) => {
        const snapshot = await get(ref(database, `/categories`));
        if (snapshot.exists()) {
            const response = snapshot.val();
            dispatch(categoriesActions.replace(response));
        }
    };
};
