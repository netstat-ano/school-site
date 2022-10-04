import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./PostsList.module.scss";
import { update, ref } from "firebase/database";
import { database } from "../../../firebase";
import { Dispatch, SetStateAction } from "react";
import post from "../../../models/post";
const PostsList: React.FC<{
    posts: post[];
    setPosts: Dispatch<SetStateAction<post[]>>;
}> = (props) => {
    const categories = useAppSelector((state) => state.categories);
    const onDeletePostHandler = (e: React.MouseEvent, id: string) => {
        const updates: { [k: string]: {} | null } = {};
        updates[`/posts/${id}`] = null;
        updates[`/posts/news/${id}`] = null;
        update(ref(database), updates);
        props.setPosts((prevState) => {
            const newState = prevState.filter((post) => post.id !== id);
            return [...newState];
        });
    };
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
                                        <span
                                            onClick={(e) => {
                                                onDeletePostHandler(e, post.id);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                className={
                                                    styles["post-delete-icon"]
                                                }
                                                icon={faXmark}
                                            />
                                        </span>
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
