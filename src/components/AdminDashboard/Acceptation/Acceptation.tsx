import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import post from "../../../models/post";
import AcceptationDetail from "./AcceptationDetail/AcceptationDetail";
const Acceptation: React.FC<{
    setPosts: React.Dispatch<React.SetStateAction<post[]>>;
    posts: post[];
}> = (props) => {
    const [acceptationPosts, setAcceptationPosts] = useState<post[]>([]);
    useEffect(() => {
        const fetchAcceptationPosts = async () => {
            const snapshot = await get(ref(database, `/posts/acceptation`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                for (const id in response) {
                    setAcceptationPosts((prevState) => [
                        response[id],
                        ...prevState,
                    ]);
                }
            }
        };
        fetchAcceptationPosts();
    }, []);
    return (
        <div>
            <div>
                <h3>To acceptation</h3>
                {acceptationPosts.map((post) => (
                    <AcceptationDetail
                        setPosts={props.setPosts}
                        posts={props.posts}
                        setAcceptationPosts={setAcceptationPosts}
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    );
};
export default Acceptation;
