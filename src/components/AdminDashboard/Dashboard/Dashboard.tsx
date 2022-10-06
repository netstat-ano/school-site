import CategorieCreator from "../CategorieCreator/CategorieCreator";
import PostCreator from "../PostCreator/PostCreator";
import styles from "./Dashboard.module.scss";
import UserCreator from "../UserCreator/UserCreator";
import { useAppSelector } from "../../../hooks/use-app-selector";
import Acceptation from "../Acceptation/Acceptation";
import user from "../../../models/user";
import { useState } from "react";
import post from "../../../models/post";
const Dashboard: React.FC<{}> = (props) => {
    const user = useAppSelector<user>((state) => state.authentication);
    const [posts, setPosts] = useState<post[]>([]);
    return (
        <div className={styles.container}>
            <article>
                {user.type === "Admin" && (
                    <Acceptation posts={posts} setPosts={setPosts} />
                )}
                <PostCreator setPosts={setPosts} posts={posts} />
                {user.type === "Admin" && <CategorieCreator posts={posts} />}
                {user.type === "Admin" && <UserCreator />}
            </article>
        </div>
    );
};
export default Dashboard;
