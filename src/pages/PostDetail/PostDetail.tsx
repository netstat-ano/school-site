import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../firebase";
import post from "../../models/post";
import styles from "./PostDetail.module.scss";
import Post from "../../components/Post/Post";
import PostEditor from "../../components/PostEditor/PostEditor";
import updatePost from "../../helpers/updatePost";
import SuccessButton from "../../components/UI/SuccessButton/SuccessButton";
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
        amountOfPhotos: 0,
        indexOfPhotos: [],
    });
    const [textValue, setTextValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);
    const onEditHandler = () => {
        setEditMode(true);
    };
    const onUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updatePost(
            { ...post, title: titleValue, text: textValue },
            { news: post.news }
        );
        setPost({ ...post, title: titleValue, text: textValue });
        setEditMode(false);
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
    }, [params.postId]);

    return (
        <div className={`center ${styles.container}`}>
            {!editMode && (
                <Post
                    setPost={setPost}
                    onEditHandler={onEditHandler}
                    post={post}
                />
            )}
            {editMode && (
                <form onSubmit={onUpdateHandler}>
                    <PostEditor
                        setTextValue={setTextValue}
                        setTitleValue={setTitleValue}
                        text={post.text}
                        title={post.title}
                    />
                    <SuccessButton button={{ type: "submit" }}>
                        Save
                    </SuccessButton>
                </form>
            )}
        </div>
    );
};
export default PostDetail;
