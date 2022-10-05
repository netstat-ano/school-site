import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import post from "../../../models/post";
const Acceptation: React.FC<{}> = () => {
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
            </div>
        </div>
    );
};
export default Acceptation;
