import post from "../../models/post";
import styles from "./Post.module.scss";
import { useAppSelector } from "../../hooks/use-app-selector";
import AttachPhotos from "../AdminDashboard/AttachPhotos/AttachPhotos";
import { useRef, useState, useEffect } from "react";
import Photos from "../Photos/Photos";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import DeletePost from "../AdminDashboard/DeletePost/DeletePost";
import uploadPhotos from "../../helpers/uploadPhotos";
import { database } from "../../firebase";
import { update, ref } from "firebase/database";
import Button from "../UI/Button/Button";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase";
import Spinner from "../UI/Spinner/Spinner";
const Post: React.FC<{
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPost: React.Dispatch<React.SetStateAction<post>>;
    post: post;
    onEditHandler: () => void;
}> = (props) => {
    const attachPhotosRef = useRef<HTMLInputElement>(null);
    const [photosIndex, setPhotosIndex] = useState<number[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector((state) => state.authentication);
    const { post, onEditHandler } = props;
    const { loading, setLoading } = props;
    let date;
    let formattedDate = "";
    let admin = false;
    if (post) {
        date = new Date(Number(post.id));
        formattedDate = `${date.getDate()}.${
            date.getMonth() + 1
        }.${date.getFullYear()}`;
        admin = user.uid === post.id || user.type === "Admin" ? true : false;
        if (checkboxRef.current && post.news) {
            checkboxRef.current!.checked = true;
        }
    }
    const fetchPhotos = async () => {
        if (post!.amountOfPhotos && post!.amountOfPhotos > 0) {
            for (const i in post.indexOfPhotos) {
                const index = Number(i);

                const url = await getDownloadURL(
                    sRef(storage, `/${post.id}/${post.indexOfPhotos![index]}`)
                );

                if (url) {
                    setPhotosIndex((prevState) => [
                        ...prevState,
                        post.indexOfPhotos![index],
                    ]);
                    setPhotos((prevState) => [...prevState, url]);
                }
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };
    const onAttachPhotosHandler = async () => {
        if (attachPhotosRef.current!.files!.length > 0) {
            post.amountOfPhotos = attachPhotosRef.current!.files!.length;
            const data = { ...post };
            data.indexOfPhotos = [];
            const updates: { [k: string]: {} } = {};
            for (let i = 0; i < attachPhotosRef.current!.files!.length; i++) {
                data.indexOfPhotos!.push(i);
            }
            updates[`/posts/${post.id}`] = data;
            if (post.news) {
                updates[`/posts/news/${post.id}`] = data;
            }
            props.setPost(data);
            await uploadPhotos(attachPhotosRef, post.id);
            await update(ref(database), updates);
            await fetchPhotos();
        }
    };
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
        fetchPhotos();
    }, [post]);
    if (loading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }
    return (
        <>
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
                    photosIndex={photosIndex}
                    setPhotosIndex={setPhotosIndex}
                    post={post}
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
            {admin && (
                <SuccessButton button={{ onClick: onEditHandler }}>
                    Edit post
                </SuccessButton>
            )}
            {admin && <DeletePost post={post} />}
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
        </>
    );
};
export default Post;
