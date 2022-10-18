import { storage } from "../firebase";
import { uploadBytes, ref as sRef } from "firebase/storage";
const uploadPhotos = async (
    attachPhotosRef: React.RefObject<HTMLInputElement>,
    id: string
) => {
    if (attachPhotosRef.current!.files) {
        const files = attachPhotosRef.current!.files;

        for (const index in files) {
            if (index !== "item" && index !== "length") {
                await uploadBytes(
                    sRef(storage, `${id}/${index}`),
                    files[index]
                );
            }
        }
        attachPhotosRef.current!.value = "";
    }
};
export default uploadPhotos;
