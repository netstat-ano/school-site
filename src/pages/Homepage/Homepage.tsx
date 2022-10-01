import photo from "../../assets/wsk.jpg";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import post from "../../models/post";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
import { useEffect, useState } from "react";
import NewsShortcut from "../../components/NewsShortcut/NewsShortcut";
const Homepage: React.FC<{}> = (props) => {
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
        <div>
            <div>
                <div>
                    <Link to="/admin">
                        <button>Admin</button>
                    </Link>
                </div>
                {/* <div className={styles.actions}>
                    <div className={styles.action}>Create post</div>
                    <div className={styles.action}>Photos</div>
                    <div className={styles.action}>Recruitment</div>
                </div> */}
                <img className={styles.photo} src={photo}></img>
            </div>
            <div className={styles["news-container"]}>
                {newsPosts.map((post) => (
                    <NewsShortcut post={post} />
                ))}
            </div>
        </div>
    );
};
export default Homepage;
