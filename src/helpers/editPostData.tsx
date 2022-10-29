import post from "../models/post";
import { ref, update } from "firebase/database";
import { database } from "../firebase";
const editPostData = async (config: {
    acceptation: boolean;
    post: post;
    amountOfPhotos: number;
}) => {
    const { acceptation, post, amountOfPhotos } = config;
    const updates: { [k: string]: {} } = {};
    for (let i = 0; i < amountOfPhotos; i++) {
        post.indexOfPhotos!.push(i);
    }
    if (!acceptation) {
        updates[`/posts/${post.id}`] = post;
        if (post.news) {
            updates[`/posts/news/${post.id}`] = post;
        }
    } else {
        updates[`/posts/acceptation/${post.id}`] = post;
    }
    await update(ref(database), updates);
};
export default editPostData;
