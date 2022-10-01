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
        text = `${props.post?.text.slice(
            0,
            Math.round(props.post?.text.length / 2)
        )}...`;
    }
    const onClickHandler = () => {
        navigate(`/post/${props.post?.id}`);
    };
    return (
        <div onClick={onClickHandler} className={`${styles.container}`}>
            <div className={styles["content-controller"]}>
                <div className={styles.username}>
                    {props.post?.user}
                    <br></br>
                    <span className={styles.date}>{formattedDate}</span>
                </div>
                <div className={styles.text}>
                    <span className={styles.title}>{props.post?.title}</span>
                    <br></br>
                    {text}
                </div>
            </div>
        </div>
    );
};
export default NewsShortcut;