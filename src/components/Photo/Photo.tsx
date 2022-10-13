import { storage } from "../../firebase";
import { ref as sRef, deleteObject } from "firebase/storage";
import CanceledButton from "../UI/CanceledButton/CanceledButton";
import styles from "./Photo.module.scss";
const Photo: React.FC<{
    photoURL: string;
    index: number;
    setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
    admin?: boolean;
    id: string;
}> = (props) => {
    const onDeletePhotoHandler = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        props.setPhotos((prevState) =>
            prevState.filter((url) => url !== props.photoURL)
        );
        const photoRef = sRef(storage, `${props.id}/${props.index}`);
        await deleteObject(photoRef);
    };
    return (
        <>
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
        </>
    );
};
export default Photo;
