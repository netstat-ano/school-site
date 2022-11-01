import styles from "./CategorieCreator.module.scss";
import Input from "../../UI/Input/Input";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import { addCategorie } from "../../../store/categories";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import React, { useRef } from "react";
import post from "../../../models/post";
import CategoriesList from "../CategoriesList/CategoriesList";
const CategorieCreator: React.FC<{ posts: post[] }> = (props) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategorie(inputRef.current!.value));
        inputRef.current!.value = "";
    };
    return (
        <div className={styles["categorie-creator"]}>
            <section>
                <form onSubmit={onSubmitHandler}>
                    <h3>Create category</h3>
                    <div>
                        <ul className={styles["categorie_creator__categories"]}>
                            <CategoriesList posts={props.posts} />
                        </ul>
                    </div>
                    <div>
                        <Input ref={inputRef} />
                    </div>
                    <div
                        className={
                            styles["categorie-creator__button-controller"]
                        }
                    >
                        <SuccessButton button={{ type: "submit" }}>
                            Add category
                        </SuccessButton>
                    </div>
                </form>
            </section>
        </div>
    );
};
export default CategorieCreator;
