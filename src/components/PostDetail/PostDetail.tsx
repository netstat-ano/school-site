import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../firebase";
import post from "../../models/post";
const PostDetail: React.FC<{}> = () => {
    const params = useParams();
    const [post, setPost] = useState<post>();
    useEffect(() => {
        const fetchPost = async () => {
            const snapshot = await get(
                ref(database, `/posts/${params.postId}`)
            );
            if (snapshot.exists()) {
                const response = snapshot.val();
                setPost(response);
            }
        };
        fetchPost();
    }, []);

    return <div></div>;
};
export default PostDetail;
