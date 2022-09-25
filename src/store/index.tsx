import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
import categories from "./categories";
const store = configureStore({
    reducer: {
        authentication: authentication.reducer,
        categories: categories.reducer,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
