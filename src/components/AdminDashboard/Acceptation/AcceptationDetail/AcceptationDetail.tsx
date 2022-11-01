import post from "../../../../models/post";
import { Link } from "react-router-dom";
import styles from "./AcceptationDetail.module.scss";
import SuccessButton from "../../../UI/SuccessButton/SuccessButton";
import CanceledButton from "../../../UI/CanceledButton/CanceledButton";
import { ref, update } from "firebase/database";
import { database } from "../../../../firebase";

const AcceptationDetail: React.FC<{
    post: post;
    setAcceptationPosts: React.Dispatch<React.SetStateAction<post[]>>;
    setPosts: React.Dispatch<React.SetStateAction<post[]>>;
    posts: post[];
}> = (props) => {
    const { posts, setPosts } = props;
    const onAcceptHandler = () => {
        const updates: { [k: string]: {} | null } = {};
        updates[`/posts/${[props.post.id]}`] = props.post;
        if (props.post.news) {
            updates[`/posts/news/${props.post.id}`] = props.post;
        }
        updates[`posts/acceptation/${props.post.id}`] = null;
        props.setAcceptationPosts((prevState) => {
            return prevState.filter((post) => post.id !== props.post.id);
        });
        setPosts((prevState) => [props.post, ...prevState]);
        update(ref(database), updates);
    };
    const onRejectHandler = () => {
        const updates: { [k: string]: {} | null } = {};
        updates[`/posts/acceptation/${props.post.id}`] = null;
        props.setAcceptationPosts((prevState) => {
            return prevState.filter((post) => post.id !== props.post.id);
        });
        update(ref(database), updates);
    };
    return (
        <div className={styles.container}>
            <div>
                <Link
                    className={styles["container__link"]}
                    to={`/post/${props.post.id}`}
                >
                    {props.post.title}
                </Link>
            </div>
            <div>
                <SuccessButton button={{ onClick: onAcceptHandler }}>
                    Accept
                </SuccessButton>
            </div>
            <div>
                <CanceledButton button={{ onClick: onRejectHandler }}>
                    Reject
                </CanceledButton>
            </div>
        </div>
    );
};
export default AcceptationDetail;
