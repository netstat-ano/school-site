import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import fetchedUser from "../../../models/fetchedUser";
import styles from "./UserList.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "firebase/auth";
const UserList: React.FC<{
    users: fetchedUser[];
    setUsers: React.Dispatch<React.SetStateAction<fetchedUser[]>>;
}> = (props) => {
    const { users, setUsers } = props;
    const onDeleteHandler = (
        e: React.MouseEvent<HTMLSpanElement>,
        uid: string
    ) => {
        // const updates: { [k: string]: {} | null } = {};
        // updates[`user/${uid}`] = null;
        // update(ref(database), updates);
        // deleteUser()
    };
    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await get(ref(database, `user/`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                for (const uid in response) {
                    setUsers((prevState) => [response[uid], ...prevState]);
                }
            }
        };
        fetchUsers();
    }, []);
    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.uid} className={styles.container}>
                        <div>{user.email}</div>
                        <div>{user.displayName}</div>
                        <div>{user.type}</div>
                        <div>
                            <span
                                onClick={(e) => {
                                    onDeleteHandler(e, user.uid);
                                }}
                            >
                                <FontAwesomeIcon
                                    className={styles.icon}
                                    icon={faXmark}
                                />
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default UserList;
