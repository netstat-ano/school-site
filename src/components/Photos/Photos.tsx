import styles from "./Photos.module.scss";
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
                <div key={index} className={styles["img-controller"]}>
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
