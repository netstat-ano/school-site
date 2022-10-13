import styles from "./Photos.module.scss";
import CanceledButton from "../UI/CanceledButton/CanceledButton";
import { ref as sRef } from "firebase/storage";
import { storage } from "../../firebase";
import React from "react";
import Photo from "../Photo/Photo";
const Photos: React.FC<{
    photos: string[];
    setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
    admin?: boolean;
    id: string;
}> = (props) => {
    return (
        <div className={styles.container}>
            {props.photos.map((photoURL, index) => (
                <div className={styles["img-controller"]}>
                    <Photo
                        id={props.id}
                        admin={props.admin}
                        setPhotos={props.setPhotos}
                        photoURL={photoURL}
                        index={index}
                    />
                </div>
            ))}
        </div>
    );
};
export default Photos;
