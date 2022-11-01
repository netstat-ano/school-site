import styles from "./Photos.module.scss";
import React from "react";
import Photo from "../Photo/Photo";
import post from "../../models/post";
const Photos: React.FC<{
    photosIndex: number[];
    setPhotosIndex: React.Dispatch<React.SetStateAction<number[]>>;
    photos: string[];
    setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
    admin?: boolean;
    id: string;
    post: post;
}> = (props) => {
    console.log(props.photosIndex);

    return (
        <div className={styles["photos"]}>
            {props.photos.map((photoURL, index) => (
                <div key={index} className={styles["photos__img-controller"]}>
                    <Photo
                        setPhotoIndex={props.setPhotosIndex}
                        post={props.post}
                        id={props.id}
                        admin={props.admin}
                        setPhotos={props.setPhotos}
                        photoURL={photoURL}
                        index={props.photosIndex[index]}
                        photosIndex={props.photosIndex}
                    />
                </div>
            ))}
        </div>
    );
};
export default Photos;
