import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./DeletePost.module.scss";
import { useNavigate } from "react-router";
import { ref, update } from "firebase/database";
import updatePost from "../../../helpers/updatePost";
import post from "../../../models/post";
import { database } from "../../../firebase";
const DeletePost: React.FC<{ post: post }> = (props) => {
    const navigate = useNavigate();
    const onDeletePost = () => {
        updatePost(props.post, { delete: true });
        navigate("/homepage");
    };
    return (
        <FontAwesomeIcon
            onClick={onDeletePost}
            className={styles["delete-post__icon"]}
            icon={faTrash}
        />
    );
};
export default DeletePost;
