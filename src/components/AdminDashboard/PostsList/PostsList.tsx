import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use-app-selector";
import post from "../../../models/post";
import styles from "./PostsList.module.scss";
const PostsList: React.FC<{ posts: post[] }> = (props) => {
    const categories = useAppSelector((state) => state.categories);
    return (
        <>
            {categories.map((category) => {
                return (
                    <div>
                        <div className={styles.category}>{category}</div>
                        {props.posts.map((post) => {
                            if (post.category === category) {
                                return (
                                    <div
                                        className={styles.container}
                                        key={post.id}
                                    >
                                        <Link
                                            className="link"
                                            to={`/post/${post.id}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </div>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </>
    );
};
export default PostsList;
