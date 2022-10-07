import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../../firebase";
import post from "../../../models/post";
import { useAppSelector } from "../../../hooks/use-app-selector";
import PostSended from "./PostSended/PostSended";
const PostsSendedToAcceptation: React.FC<{
    acceptationPosts: post[];
    setAcceptationPosts: React.Dispatch<React.SetStateAction<post[]>>;
}> = (props) => {
    const { setAcceptationPosts, acceptationPosts } = props;
    const user = useAppSelector((state) => state.authentication);
    useEffect(() => {
        const fetchAcceptationPost = async () => {
            const snapshot = await get(ref(database, `/posts/acceptation/`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                for (const id in response) {
                    if (response[id].userID === user.uid) {
                        setAcceptationPosts((prevState) => [
                            response[id],
                            ...prevState,
                        ]);
                    }
                }
            }
        };
        fetchAcceptationPost();
    }, []);
    return (
        <div>
            <div>
                <h3>Sended to acceptation</h3>
            </div>
            {acceptationPosts.map((post) => (
                <PostSended
                    setAcceptationPosts={setAcceptationPosts}
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
};
export default PostsSendedToAcceptation;
