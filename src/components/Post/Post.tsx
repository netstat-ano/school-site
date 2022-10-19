import post from "../../models/post";
import styles from "./Post.module.scss";
import { useAppSelector } from "../../hooks/use-app-selector";
import AttachPhotos from "../AdminDashboard/AttachPhotos/AttachPhotos";
import { useRef, useState, useEffect } from "react";
import Photos from "../Photos/Photos";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import DeletePost from "../AdminDashboard/DeletePost/DeletePost";
import updatePhotos from "../../helpers/uploadPhotos";
import { database } from "../../firebase";
import { update, ref } from "firebase/database";
import Button from "../UI/Button/Button";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase";
const Post: React.FC<{ post: post; onEditHandler: () => void }> = (props) => {
    const attachPhotosRef = useRef<HTMLInputElement>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector((state) => state.authentication);
    const { post, onEditHandler } = props;

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
    if (post.news) {
        checkboxRef.current!.checked = true;
    }
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
        const fetchPhotos = async () => {
            if (post!.amountOfPhotos && post!.amountOfPhotos > 0) {
                for (let i = 0; i < post!.amountOfPhotos; i++) {
                    const url = await getDownloadURL(
                        sRef(storage, `/${post.id}/${i}`)
                    );
                    setPhotos((prevState) => [url, ...prevState]);
                }
            }
        };
        fetchPhotos();
    }, [post]);
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
        </>
    );
};
export default Post;
