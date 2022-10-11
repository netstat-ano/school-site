import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./DeletePost.module.scss";
import { useNavigate } from "react-router";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase";
const DeletePost: React.FC<{ id: string }> = (props) => {
    const navigate = useNavigate();
    const onDeletePost = () => {
        const updates: { [k: string]: {} | null } = {};
        updates[`posts/${props.id}`] = null;
        updates[`/posts/news/${props.id}`] = null;
        navigate("/homepage");
        update(ref(database), updates);
    };
    return (
        <FontAwesomeIcon
            onClick={onDeletePost}
            className={styles.icon}
            icon={faTrash}
        />
    );
};
export default DeletePost;
