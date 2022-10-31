import React, { useRef, useState, useEffect } from "react";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import styles from "./PostCreator.module.scss";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { ref, update, get } from "firebase/database";
import { database } from "../../../firebase";
import PostsList from "../PostsList/PostsList";
import post from "../../../models/post";
import user from "../../../models/user";
import PostsSendedToAcceptation from "../PostsSendedToAcceptation/PostsSendedToAcceptation";
import SuccessNotification from "../../UI/SuccessNotification/SuccessNotification";
import AttachPhotos from "../AttachPhotos/AttachPhotos";
import uploadPhotos from "../../../helpers/uploadPhotos";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import updatePost from "../../../helpers/updatePost";
import PostEditor from "../../PostEditor/PostEditor";
import editPostData from "../../../helpers/editPostData";
const PostCreator: React.FC<{
    acceptationPosts: post[];
    setAcceptationPosts: React.Dispatch<React.SetStateAction<post[]>>;
    setPosts: React.Dispatch<React.SetStateAction<post[]>>;
    posts: post[];
}> = (props) => {
    const { setPosts, posts, setAcceptationPosts, acceptationPosts } = props;
    const [notification, setNotification] = useState("");
    const [textValue, setTextValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
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
            title: titleValue,
            text: textValue,
            user: String(user.username),
            id,
            category: selectedCategory,
            news,
            userID: String(user.uid),
            amountOfPhotos: attachPhotosRef.current?.files?.length,
            indexOfPhotos: [],
        };
        const acceptation = user.type === "Admin" ? false : true;
        await editPostData({
            acceptation: acceptation,
            post: data,
            amountOfPhotos: attachPhotosRef.current!.files!.length,
        });

        if (user.type === "Admin") {
            setPosts((prevState) => [data, ...prevState]);
        } else {
            setNotification("Query was sended");
            setTimeout(() => {
                setNotification("");
            }, 1500);
            setAcceptationPosts((prevState) => [data, ...prevState]);
        }
        setTitleValue("");
        setTextValue("");
        if (user.type !== "Admin") {
            await uploadPhotos(attachPhotosRef, id, { acceptation: true });
        } else {
            await uploadPhotos(attachPhotosRef, id);
        }
    };
    useEffect(() => {
        if (!selectedCategory || options.length === 1) {
            setSelectedCategory(options[0]);
        }
    }, [options[0]]);
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
                    <PostEditor
                        setTextValue={setTextValue}
                        setTitleValue={setTitleValue}
                        text=""
                        title=""
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

                    <div className={styles["add-news-controller"]}>
                        <div>
                            <label htmlFor="news">Add to news</label>
                        </div>
                        <div>
                            <input
                                onChange={onCheckboxChangeHandler}
                                id="news"
                                defaultValue={checkboxValue}
                                type="checkbox"
                            />
                        </div>
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
