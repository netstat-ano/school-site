import styles from "./CategorieCreator.module.scss";
import Input from "../../UI/Input/Input";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import { addCategorie } from "../../../store/categories";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import React from "react";
const CategorieCreator: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategorie("test"));
    };
    return (
        <div className={styles.container}>
            <form onSubmit={onSubmitHandler}>
                <h3>Create category</h3>
                <div>
                    <Input />
                </div>
                <div className={styles["button-controller"]}>
                    <SuccessButton button={{ type: "submit" }}>
                        Add category
                    </SuccessButton>
                </div>
            </form>
        </div>
    );
};
export default CategorieCreator;
