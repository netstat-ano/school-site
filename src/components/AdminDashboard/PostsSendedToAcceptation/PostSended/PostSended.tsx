import post from "../../../../models/post";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./PostSended.module.scss";
import React from "react";
import { ref, update } from "firebase/database";
import { database } from "../../../../firebase";
const PostSended: React.FC<{
    post: post;
    setAcceptationPosts: React.Dispatch<React.SetStateAction<post[]>>;
}> = (props) => {
    const { post, setAcceptationPosts } = props;
    const onDeleteHandler = async (e: React.MouseEvent<HTMLSpanElement>) => {
        const updates: { [k: string]: {} | null } = {};
        updates[`posts/acceptation/${post.id}`] = null;
        await update(ref(database), updates);
        const id = post.id;
        setAcceptationPosts((prevState) =>
            prevState.filter((post) => post.id !== id)
        );
    };
    return (
        <div className={styles.container}>
            <div>
                <Link className={styles.link} to={`/post/${post.id}`}>
                    {post.title}
                </Link>
            </div>
            <div>
                <span onClick={onDeleteHandler}>
                    <FontAwesomeIcon className={styles.icon} icon={faXmark} />
                </span>
            </div>
        </div>
    );
};
export default PostSended;
