import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../firebase";
import post from "../../models/post";
import styles from "./PostDetail.module.scss";
const PostDetail: React.FC<{}> = () => {
    const params = useParams();
    const [post, setPost] = useState<post>();
    let date;
    let formattedDate = "";
    if (post) {
        date = new Date(Number(post.id));
        formattedDate = `${date.getDate()}.${
            date.getMonth() + 1
        }.${date.getFullYear()}`;
    }

    useEffect(() => {
        const fetchPost = async () => {
            const snapshot = await get(
                ref(database, `/posts/${params.postId}`)
            );
            if (snapshot.exists()) {
                const response = snapshot.val();
                setPost(response);
            }
        };
        fetchPost();
    }, []);

    return (
        <div className={`center ${styles.container}`}>
            <div className={styles["content-controller"]}>
                <div className={styles.username}>
                    {post?.user}
                    <br></br>
                    <span className={styles.date}>{formattedDate}</span>
                </div>
                <div className={styles.text}>
                    <span className={styles.title}>{post?.title}</span>
                    <br></br>
                    {post?.text}
                </div>
            </div>
        </div>
    );
};
export default PostDetail;
