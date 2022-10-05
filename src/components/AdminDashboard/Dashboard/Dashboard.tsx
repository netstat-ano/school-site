import CategorieCreator from "../CategorieCreator/CategorieCreator";
import PostCreator from "../PostCreator/PostCreator";
import styles from "./Dashboard.module.scss";
import UserCreator from "../UserCreator/UserCreator";
import { useAppSelector } from "../../../hooks/use-app-selector";
import Acceptation from "../Acceptation/Acceptation";
import user from "../../../models/user";
const Dashboard: React.FC<{}> = (props) => {
    const user = useAppSelector<user>((state) => state.authentication);
    return (
        <div className={styles.container}>
            <article>
                {user.type === "Admin" && <Acceptation />}
                <PostCreator />
                {user.type === "Admin" && <CategorieCreator />}
                {user.type === "Admin" && <UserCreator />}
            </article>
        </div>
    );
};
export default Dashboard;
