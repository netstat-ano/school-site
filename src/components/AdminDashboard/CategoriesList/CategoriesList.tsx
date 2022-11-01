import styles from "./CategoriesList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/use-app-selector";
import React from "react";
import { removeCategory } from "../../../store/categories";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import post from "../../../models/post";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase";
const CategoriesList: React.FC<{
    posts: post[];
}> = (props) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector<string[]>((state) => state.categories);
    const onDeleteHandler = (
        e: React.MouseEvent,
        id: number,
        category: string
    ) => {
        const deletedPosts = props.posts.filter(
            (post) => post.category === category
        );

        const updates: { [k: string]: {} | null } = {};
        for (const post of deletedPosts) {
            updates[`/posts/${post.id}`] = null;
            updates[`/posts/news/${post.id}`] = null;
        }

        dispatch(removeCategory(id));
        update(ref(database), updates);
    };
    return (
        <>
            {categories.map((category, index) => (
                <div key={index} className={styles["categories-list__item"]}>
                    <div>
                        <li>{category}</li>
                    </div>
                    <div>
                        <span
                            onClick={(e) => onDeleteHandler(e, index, category)}
                        >
                            <FontAwesomeIcon
                                className={
                                    styles["categories-list__item-delete"]
                                }
                                icon={faXmark}
                            />
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
};
export default CategoriesList;
