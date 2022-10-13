import Textarea from "../../UI/Textarea/Textarea";
import React, { useRef, useState, useEffect } from "react";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import styles from "./PostCreator.module.scss";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { ref, update, get } from "firebase/database";
import { database } from "../../../firebase";
import PostsList from "../PostsList/PostsList";
import post from "../../../models/post";
import Input from "../../UI/Input/Input";
import user from "../../../models/user";
import PostsSendedToAcceptation from "../PostsSendedToAcceptation/PostsSendedToAcceptation";
import SuccessNotification from "../../UI/SuccessNotification/SuccessNotification";
import AttachPhotos from "../AttachPhotos/AttachPhotos";
import { storage } from "../../../firebase";
import { uploadBytes, ref as sRef } from "firebase/storage";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const PostCreator: React.FC<{
    acceptationPosts: post[];
    setAcceptationPosts: React.Dispatch<React.SetStateAction<post[]>>;
    setPosts: React.Dispatch<React.SetStateAction<post[]>>;
    posts: post[];
}> = (props) => {
    const { setPosts, posts, setAcceptationPosts, acceptationPosts } = props;
    const [notification, setNotification] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector<user>((state) => state.authentication);
    const [checkboxValue, setCheckboxValue] = useState<string>("off");
    const options = useAppSelector<string[]>((state) => state.categories);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        options[0]
    );
    const attachPhotosRef = useRef<HTMLInputElement>(null);
    const onCheckboxChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (checkboxValue === "off") {
            setCheckboxValue("on");
        } else {
            setCheckboxValue("off");
        }
    };
    const onChangeCategoryHandler = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedCategory(e.target.value);
    };
    const onAddPostHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        let news: boolean;
        if (checkboxValue === "off") {
            news = false;
        } else {
            news = true;
        }
        const id = String(Date.now());
        const data: post = {
            title: inputRef.current!.value,
            text: textareaRef.current!.value,
            user: String(user.username),
            id,
            category: selectedCategory,
            news,
            userID: String(user.uid),
            amountOfPhotos: attachPhotosRef.current?.files?.length,
        };
        const updates: { [k: string]: {} } = {};
        if (user.type === "Admin") {
            if (news) {
                updates[`/posts/news/${id}`] = data;
            }
            updates[`/posts/${id}`] = data;
            setPosts((prevState) => [data, ...prevState]);
        } else {
            updates[`/posts/acceptation/${id}`] = data;
            inputRef.current!.value = "";
            textareaRef.current!.value = "";
            setNotification("Query was sended");
            setTimeout(() => {
                setNotification("");
            }, 1500);
            setAcceptationPosts((prevState) => [data, ...prevState]);
        }
        update(ref(database), updates);
        if (attachPhotosRef.current?.files) {
            const files = attachPhotosRef.current?.files;

            for (const index in files) {
                if (index !== "item" && index !== "length") {
                    await uploadBytes(
                        sRef(storage, `${id}/${index}`),
                        files[index]
                    );
                }
            }
            attachPhotosRef.current!.value = "";
        }
    };
    useEffect(() => {
        const fetchPosts = async () => {
            const snapshot = await get(ref(database, `/posts/`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                for (const id in response) {
                    setPosts((prevState) => [response[id], ...prevState]);
                }
            }
        };
        fetchPosts();
    }, []);
    return (
        <div className={styles.container}>
            <section>
                <form onSubmit={onAddPostHandler}>
                    <h3>Create a post</h3>
                    {notification && (
                        <SuccessNotification>
                            {notification}
                        </SuccessNotification>
                    )}
                    <div className={styles["input-controller"]}>
                        <Input
                            input={{ type: "text", placeholder: "Title" }}
                            ref={inputRef}
                        />
                    </div>
                    <Textarea
                        textarea={{ placeholder: "Message" }}
                        ref={textareaRef}
                    />
                    <div>
                        Categories:
                        <select
                            onChange={onChangeCategoryHandler}
                            value={selectedCategory}
                            className={styles.select}
                        >
                            {options.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="news">Add to news</label>
                        <input
                            onChange={onCheckboxChangeHandler}
                            id="news"
                            defaultValue={checkboxValue}
                            type="checkbox"
                        />
                    </div>
                    <AttachPhotos
                        accept="image/png, image/jpeg"
                        ref={attachPhotosRef}
                        multiple={true}
                        name="photos"
                    >
                        <Button
                            className={styles["upload-button"]}
                            button={{ type: "button" }}
                        >
                            <>
                                Attach a photo
                                <FontAwesomeIcon
                                    className={styles["upload-icon"]}
                                    icon={faUpload}
                                />
                            </>
                        </Button>
                    </AttachPhotos>
                    {<PostsList setPosts={setPosts} posts={posts} />}
                    <div>
                        <SuccessButton button={{ type: "submit" }}>
                            Add post
                        </SuccessButton>
                    </div>
                </form>
                {user.type === "Editor" && (
                    <div>
                        <PostsSendedToAcceptation
                            setAcceptationPosts={setAcceptationPosts}
                            acceptationPosts={acceptationPosts}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};
export default PostCreator;
