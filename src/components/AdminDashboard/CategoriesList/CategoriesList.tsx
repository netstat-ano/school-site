import styles from "./CategoriesList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/use-app-selector";
import React from "react";
import { removeCategory } from "../../../store/categories";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
const CategoriesList: React.FC<{}> = (props) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector<string[]>((state) => state.categories);
    const onDeleteHandler = (e: React.MouseEvent, id: number) => {
        dispatch(removeCategory(id));
    };
    return (
        <>
            {categories.map((category, index) => (
                <div key={index} className={styles["categories-list-item"]}>
                    <div>
                        <li>{category}</li>
                    </div>
                    <div>
                        <span onClick={(e) => onDeleteHandler(e, index)}>
                            <FontAwesomeIcon
                                className={
                                    styles["categories-list-item-delete"]
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
