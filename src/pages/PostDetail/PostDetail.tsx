import { get, ref, update } from "firebase/database";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { database } from "../../firebase";
import { useAppSelector } from "../../hooks/use-app-selector";
import post from "../../models/post";
import styles from "./PostDetail.module.scss";
import updatePhotos from "../../helpers/uploadPhotos";
import DeletePost from "../../components/AdminDashboard/DeletePost/DeletePost";
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import Photos from "../../components/Photos/Photos";
import AttachPhotos from "../../components/AdminDashboard/AttachPhotos/AttachPhotos";
import Button from "../../components/UI/Button/Button";
const PostDetail: React.FC<{}> = () => {
    const params = useParams();
    const attachPhotosRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector((state) => state.authentication);
    const [photos, setPhotos] = useState<string[]>([]);
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
    const onAttachPhotosHandler = async () => {
        if (attachPhotosRef.current!.files!.length > 0) {
            updatePhotos(attachPhotosRef, post.id);
            const files = attachPhotosRef.current!.files!;
            for (const index in files) {
                const fileReader = new FileReader();
                if (index !== "length" && index !== "item") {
                    const result = fileReader.readAsDataURL(files[index]);

                    setPhotos((prevState) => [String(result), ...prevState]);
                }
            }
        }
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
                if (response.news) {
                    checkboxRef.current!.checked = true;
                }
            } else {
                const snapshot = await get(
                    ref(database, `/posts/acceptation/${params.postId}`)
                );
                if (snapshot.exists()) {
                    response = snapshot.val();
                    setPost(response);
                    if (response.news) {
                        checkboxRef.current!.checked = true;
                    }
                }
            }

            if (response!.amountOfPhotos && response!.amountOfPhotos > 0) {
                for (let i = 0; i < response!.amountOfPhotos; i++) {
                    const url = await getDownloadURL(
                        sRef(storage, `/${params.postId}/${i}`)
                    );
                    setPhotos((prevState) => [url, ...prevState]);
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
            <div>
                <Photos
                    admin={admin}
                    id={post.id}
                    setPhotos={setPhotos}
                    photos={photos}
                />
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
            {admin && (
                <AttachPhotos
                    input={{ onChange: onAttachPhotosHandler }}
                    ref={attachPhotosRef}
                    name="attachPhotos"
                    multiple={true}
                    accept="image/png, image/jpeg"
                >
                    <Button
                        className={styles["attach-button"]}
                        button={{ type: "button" }}
                    >
                        Attach photos
                    </Button>
                </AttachPhotos>
            )}
        </div>
    );
};
export default PostDetail;
