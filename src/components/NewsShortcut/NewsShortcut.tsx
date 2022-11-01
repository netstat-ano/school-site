import post from "../../models/post";
import styles from "./NewsShortcut.module.scss";
import { useNavigate } from "react-router";
const NewsShortcut: React.FC<{ post: post }> = (props: { post: post }) => {
    let formattedDate = "";
    let text = "";
    const navigate = useNavigate();
    if (props.post) {
        let date = new Date(Number(props.post.id));
        formattedDate = `${date.getDate()}.${
            date.getMonth() + 1
        }.${date.getFullYear()}`;
        if (props.post?.text.length > 100) {
            text = `${props.post?.text.slice(0, 50)}...`;
        } else {
            text = props.post?.text;
        }
    }
    const onClickHandler = () => {
        navigate(`/post/${props.post?.id}`);
    };
    return (
        <div onClick={onClickHandler} className={`${styles["news-shortcut"]}`}>
            <div className={styles["news-shortcut__content"]}>
                <div className={styles.username}>
                    {props.post?.user}
                    <br></br>
                    <span className={styles["news-shortcut__content__date"]}>
                        {formattedDate}
                    </span>
                </div>
                <div className={styles["news-shortcut__content__text"]}>
                    <span
                        className={styles["news-shortcut__content__text-title"]}
                    >
                        {props.post?.title}
                    </span>
                    <br></br>
                    {text}
                </div>
                <div className={styles["news-shortcut__content__space"]}></div>
                <div>
                    <span
                        className={styles["news-shortcut__content__category"]}
                    >
                        Category: {props.post?.category}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default NewsShortcut;
