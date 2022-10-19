import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../firebase";
import post from "../../models/post";
import styles from "./PostDetail.module.scss";
import Post from "../../components/Post/Post";
import PostEditor from "../../components/PostEditor/PostEditor";
import updatePost from "../../helpers/updatePost";
const PostDetail: React.FC<{}> = () => {
    const params = useParams();
    const [post, setPost] = useState<post>({
        title: "",
        user: "",
        text: "",
        id: "",
        category: "",
        news: false,
        userID: "",
    });
    const [textValue, setTextValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);
    const onEditHandler = () => {
        setEditMode(true);
    };
    const onUpdateHandler = () => {
        updatePost({ ...post, title: titleValue, text: textValue });
    };
    useEffect(() => {
        const fetchPost = async () => {
            let response: post;
            const snapshot = await get(
                ref(database, `/posts/${params.postId}`)
            );
            if (snapshot.exists()) {
                response = snapshot.val();
                setPost(response);
            } else {
                const snapshot = await get(
                    ref(database, `/posts/acceptation/${params.postId}`)
                );
                if (snapshot.exists()) {
                    response = snapshot.val();
                    setPost(response);
                }
            }
        };
        fetchPost();
    }, []);

    return (
        <div className={`center ${styles.container}`}>
            {!editMode && <Post onEditHandler={onEditHandler} post={post} />}
            {editMode && (
                <PostEditor
                    setTextValue={setTextValue}
                    setTitleValue={setTitleValue}
                    onSaveHandler={onUpdateHandler}
                    text={post.text}
                    title={post.title}
                />
            )}
        </div>
    );
};
export default PostDetail;
