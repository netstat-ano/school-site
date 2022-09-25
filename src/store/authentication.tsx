import { createSlice } from "@reduxjs/toolkit";
import userLogin from "../models/userLogin";
import { auth } from "../firebase";
import user from "../models/user";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootState } from "./index";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
const authentication = createSlice({
    name: "authentication",
    initialState: {},
    reducers: {
        login(state, action: { payload: { user: user } }) {
            state = action.payload.user;
            return state;
        },
    },
});
export default authentication;
export const authenticationActions = authentication.actions;
export const authenticationLogin = (
    user: userLogin
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const snapshot = await signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
        );
        dispatch(
            authenticationActions.login({
                user: {
                    uid: snapshot.user.uid,
                    username: snapshot.user.displayName,
                    email: snapshot.user.email!,
                },
            })
        );
    };
};
