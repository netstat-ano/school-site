import { ref, update } from "firebase/database";
import { database } from "../firebase";
import post from "../models/post";

const updatePost = async (
    post: post,
    acceptation?: boolean,
    news?: boolean
) => {
    const updates: { [k: string]: post | null } = {};
    if (acceptation) {
        updates[`/posts/acceptation/${post.id}`] = post;
    } else {
        updates[`/posts/${post.id}`] = post;
        if (news) {
            updates[`/posts/${post.id}`] = post;
        }
    }
    update(ref(database), updates);
};
export default updatePost;
