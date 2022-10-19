import { ref, update } from "firebase/database";
import { database } from "../firebase";
import post from "../models/post";

const updatePost = async (
    post: post,
    config: { acceptation?: boolean; news?: boolean; delete?: boolean }
) => {
    const updates: { [k: string]: post | null } = {};
    if (config.delete) {
        updates[`/posts/acceptation/${post.id}`] = null;
        updates[`/posts/news/${post.id}`] = null;
        updates[`/posts/${post.id}`] = null;
    } else if (config.acceptation) {
        updates[`/posts/acceptation/${post.id}`] = post;
    } else {
        updates[`/posts/${post.id}`] = post;
        if (config.news) {
            updates[`/posts/news/${post.id}`] = post;
        }
    }
    update(ref(database), updates);
};
export default updatePost;
