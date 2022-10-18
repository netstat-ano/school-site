import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { useAppSelector } from "../../hooks/use-app-selector";
import post from "../../models/post";
import NavElement from "./NavElement/NavElement";
import styles from "./NavElements.module.scss";
const NavElements: React.FC<{}> = () => {
    const [posts, setPosts] = useState<post[]>([]);
    const [isShown, setIsShown] = useState<string>("");
    const categories = useAppSelector((state) => state.categories);
    const onMouseOverHandler = (
        e: React.MouseEvent<HTMLDivElement>,
        category: string
    ) => {
        setIsShown(category);
    };
    const onMouseOutHandler = () => {
        setIsShown("");
    };
    useEffect(() => {
        const fetchData = async () => {
            if (categories) {
                const snapshotPosts = await get(ref(database, `/posts/`));
                if (snapshotPosts.exists()) {
                    const responsePosts = snapshotPosts.val();
                    for (const id in responsePosts) {
                        if (id !== "news") {
                            setPosts((prevState) => [
                                responsePosts[id],
                                ...prevState,
                            ]);
                        }
                    }
                }
            }
        };
        fetchData();
    }, []);
    return (
        <div className={styles.container}>
            {categories.map((category) => (
                <div key={category} className={styles["nav-controller"]}>
                    <div
                        className={styles.nav}
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, category);
                        }}
                        onMouseLeave={onMouseOutHandler}
                    >
                        {category}
                        {posts.map((post) => (
                            <NavElement
                                key={post.id}
                                isShown={isShown}
                                category={category}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default NavElements;
