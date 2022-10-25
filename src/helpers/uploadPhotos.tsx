import { database, storage } from "../firebase";
import { uploadBytes, ref as sRef } from "firebase/storage";
import { ref, update } from "firebase/database";
const uploadPhotos = async (
    attachPhotosRef: React.RefObject<HTMLInputElement>,
    id: string
) => {
    if (attachPhotosRef.current!.files) {
        const amountOfPhotos = attachPhotosRef.current!.files.length;
        const updates: { [k: string]: {} } = {};
        updates[`/posts/${id}/amountOfPhotos`] = amountOfPhotos;
        update(ref(database), updates);
        const files = attachPhotosRef.current!.files;
        for (const index in files) {
            if (index !== "item" && index !== "length") {
                const updates: { [k: string]: {} } = {};

                await uploadBytes(
                    sRef(storage, `${id}/${index}`),
                    files[index]
                );
            }
        }
        // attachPhotosRef.current!.value = "";
    }
};
export default uploadPhotos;
