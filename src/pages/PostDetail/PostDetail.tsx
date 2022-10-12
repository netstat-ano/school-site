import { get, ref, update } from "firebase/database";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { database } from "../../firebase";
import { useAppSelector } from "../../hooks/use-app-selector";
import post from "../../models/post";
import styles from "./PostDetail.module.scss";
import DeletePost from "../../components/AdminDashboard/DeletePost/DeletePost";
const PostDetail: React.FC<{}> = () => {
    const params = useParams();
    const user = useAppSelector((state) => state.authentication);
    const [post, setPost] = useState<post>({
        title: "",
        user: "",
        category: "",
        text: "",
        id: "",
        news: false,
        userID: "",
    });
    const checkboxRef = useRef<HTMLInputElement>(null);
    let date;
    let formattedDate = "";
    let admin = false;
    if (post) {
        date = new Date(Number(post.id));
        formattedDate = `${date.getDate()}.${
            date.getMonth() + 1
        }.${date.getFullYear()}`;
        admin = user.uid === post.id || user.type === "Admin" ? true : false;
    }
    const onCheckboxChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updates: { [k: string]: post | null } = {};
        if (e.target.checked) {
            updates[`posts/${post!.id}`] = { ...post, news: true };
            updates[`posts/news/${post!.id}`] = { ...post, news: true };
            update(ref(database), updates);
        } else {
            updates[`posts/${post!.id}`] = { ...post, news: false };
            updates[`posts/news/${post!.id}`] = null;
            update(ref(database), updates);
        }
    };
    useEffect(() => {
        const fetchPost = async () => {
            const snapshot = await get(
                ref(database, `/posts/${params.postId}`)
            );
            if (snapshot.exists()) {
                const response: post = snapshot.val();
                setPost(response);
                if (response.news) {
                    checkboxRef.current!.checked = true;
                }
            } else {
                const snapshot = await get(
                    ref(database, `/posts/acceptation/${params.postId}`)
                );
                if (snapshot.exists()) {
                    const response: post = snapshot.val();
                    setPost(response);
                    if (response.news) {
                        checkboxRef.current!.checked = true;
                    }
                }
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
            {admin && (
                <div className={styles["addnews-controller"]}>
                    <label htmlFor="news">Add to news</label>
                    <input
                        ref={checkboxRef}
                        onInput={onCheckboxChangeHandler}
                        id="news"
                        type="checkbox"
                    ></input>
                </div>
            )}
            {admin && <DeletePost id={post.id} />}
        </div>
    );
};
export default PostDetail;
