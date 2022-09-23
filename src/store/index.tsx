import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
const store = configureStore({
    reducer: { authentication: authentication.reducer },
});
export default store;
