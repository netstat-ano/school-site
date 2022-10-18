import post from "../../models/post";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
import { useEffect, useState } from "react";
import NewsShortcut from "../../components/NewsShortcut/NewsShortcut";
import styles from "./News.module.scss";
const News: React.FC<{}> = () => {
    const [newsPosts, setNewsPosts] = useState<post[]>([]);
    useEffect(() => {
        const fetchNews = async () => {
            const snapshot = await get(ref(database, `/posts/news`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                for (const id in response) {
                    setNewsPosts((prevState) => [response[id], ...prevState]);
                }
            }
        };
        fetchNews();
    }, []);
    return (
        <div className={styles["news-container"]}>
            {newsPosts.map((post) => (
                <NewsShortcut key={post.id} post={post} />
            ))}
        </div>
    );
};
export default News;
