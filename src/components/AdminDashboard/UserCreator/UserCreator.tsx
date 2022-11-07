import React from "react";
import Input from "../../UI/Input/Input";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import styles from "./UserCreator.module.scss";
import { useRef, useState } from "react";
import fetchedUser from "../../../models/fetchedUser";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase";
import UserList from "../UserList/UserList";
const UserCreator: React.FC<{}> = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [users, setUsers] = useState<fetchedUser[]>([]);
    const [entitlements, setEntitlements] = useState<string>("Admin");
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEntitlements(e.target.value);
    };
    const onAddUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            emailRef.current?.value &&
            passwordRef.current?.value &&
            usernameRef.current?.value
        ) {
            const addedUser = await createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            const user = {
                type: entitlements,
                uid: addedUser.user.uid,
                displayName: usernameRef.current.value,
                email: emailRef.current.value,
            };
            emailRef.current.value = "";
            passwordRef.current.value = "";
            usernameRef.current.value = "";
            setUsers((prevState) => [user, ...prevState]);
            await updateProfile(addedUser.user, {
                displayName: usernameRef.current.value,
            });
            const updates: { [k: string]: {} } = {};
            updates[`/user/${addedUser.user.uid}`] = user;
            await update(ref(database), updates);
        }
    };
    return (
        <div className={styles["user-creator"]}>
            <form onSubmit={onAddUserHandler}>
                <h3>Create a user</h3>
                <UserList users={users} setUsers={setUsers} />
                <div>
                    Entitlements
                    <select onInput={onSelectHandler}>
                        <option>Admin</option>
                        <option>Editor</option>
                    </select>
                </div>
                <div>
                    <Input
                        ref={emailRef}
                        input={{
                            placeholder: "E-mail",
                            className: styles["user-creator__input"],
                        }}
                    />
                </div>
                <div>
                    <Input
                        ref={passwordRef}
                        input={{
                            placeholder: "Password",
                            className: styles["user-creator__input"],
                        }}
                    />
                </div>
                <div>
                    <Input
                        ref={usernameRef}
                        input={{
                            placeholder: "Username",
                            className: styles["user-creator__input"],
                        }}
                    />
                </div>
                <div>
                    <SuccessButton
                        button={{
                            type: "submit",
                            className: styles["user-creator__input"],
                        }}
                    >
                        Add user
                    </SuccessButton>
                </div>
            </form>
        </div>
    );
};
export default UserCreator;
