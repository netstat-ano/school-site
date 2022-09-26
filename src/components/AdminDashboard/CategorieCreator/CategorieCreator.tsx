import styles from "./CategorieCreator.module.scss";
import Input from "../../UI/Input/Input";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import { addCategorie } from "../../../store/categories";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import React, { useRef } from "react";
import { useAppSelector } from "../../../hooks/use-app-selector";
import CategoriesList from "../CategoriesList/CategoriesList";
const CategorieCreator: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategorie(inputRef.current!.value));
    };
    return (
        <div className={styles.container}>
            <form onSubmit={onSubmitHandler}>
                <h3>Create category</h3>
                <div>
                    <ul className={styles["categories"]}>
                        <CategoriesList />
                    </ul>
                </div>
                <div>
                    <Input ref={inputRef} />
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
