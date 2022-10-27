import { database, storage } from "../../firebase";
import { ref as sRef, deleteObject } from "firebase/storage";
import CanceledButton from "../UI/CanceledButton/CanceledButton";
import styles from "./Photo.module.scss";
import post from "../../models/post";
import { ref, update } from "firebase/database";
const Photo: React.FC<{
    photoURL: string;
    index: number;
    setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
    admin?: boolean;
    id: string;
    post: post;
    setPhotoIndex: React.Dispatch<React.SetStateAction<number[]>>;
    photosIndex: number[];
}> = (props) => {
    const onDeletePhotoHandler = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        props.setPhotos((prevState) =>
            prevState.filter((url) => url !== props.photoURL)
        );
        props.setPhotoIndex((prevState) =>
            prevState.filter((index) => index !== props.index)
        );
        const photoRef = sRef(storage, `${props.id}/${props.index}`);
        const updates: { [k: string]: {} } = {};
        const data = {
            ...props.post,
            indexOfPhotos: [
                ...props.photosIndex!.filter((index) => index !== props.index),
            ],
        };
        updates[`/posts/${props.id}`] = data;
        if (props.post.news) {
            updates[`/posts/news/${props.id}`] = data;
        }
        await update(ref(database), updates);
        await deleteObject(photoRef);
    };
    return (
        <div className={styles.container}>
            <img className={styles.img} src={props.photoURL}></img>
            {props.admin && (
                <CanceledButton
                    button={{
                        onClick: onDeletePhotoHandler,
                    }}
                >
                    Delete photo
                </CanceledButton>
            )}
        </div>
    );
};
export default Photo;
