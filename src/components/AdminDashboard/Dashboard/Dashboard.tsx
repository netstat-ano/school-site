import CategorieCreator from "../CategorieCreator/CategorieCreator";
import PostCreator from "../../PostCreator/PostCreator";
import styles from "./Dashboard.module.scss";
const Dashboard: React.FC<{}> = (props) => {
    return (
        <div className={styles.container}>
            <article>
                <PostCreator />
                <CategorieCreator />
            </article>
        </div>
    );
};
export default Dashboard;
