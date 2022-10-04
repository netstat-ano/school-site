import CategorieCreator from "../CategorieCreator/CategorieCreator";
import PostCreator from "../PostCreator/PostCreator";
import styles from "./Dashboard.module.scss";
import UserCreator from "../UserCreator/UserCreator";
const Dashboard: React.FC<{}> = (props) => {
    return (
        <div className={styles.container}>
            <article>
                <PostCreator />
                <CategorieCreator />
                <UserCreator />
            </article>
        </div>
    );
};
export default Dashboard;
