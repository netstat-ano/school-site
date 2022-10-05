import { createSlice } from "@reduxjs/toolkit";
import userLogin from "../models/userLogin";
import { auth, database } from "../firebase";
import user from "../models/user";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootState } from "./index";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { ref, get } from "firebase/database";
const authentication = createSlice({
    name: "authentication",
    initialState: {} as user,
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
        const snapshotData = await get(
            ref(database, `/user/${snapshot.user.uid}`)
        );
        const responseData = snapshotData.val();
        let type = "Admin";
        let username = "Admin";
        if (snapshotData.exists()) {
            if (responseData.type) {
                type = responseData.type;
                username = responseData.displayName;
            }
        }

        dispatch(
            authenticationActions.login({
                user: {
                    uid: snapshot.user.uid,
                    username,
                    email: snapshot.user.email!,
                    type: type,
                },
            })
        );
    };
};
