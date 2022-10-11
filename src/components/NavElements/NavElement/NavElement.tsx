import post from "../../../models/post";
import styles from "./NavElement.module.scss";
import { Link } from "react-router-dom";
const NavElement: React.FC<{
    category: string;
    post: post;
    isShown: string;
}> = (props) => {
    const { category, post, isShown } = props;
    if (post.category !== category) {
        return <></>;
    }
    return (
        <div
            className={`${
                isShown === props.category ? styles.container : styles.dnone
            }`}
        >
            <Link className={`link ${styles.link}`} to={`/post/${post.id}`}>
                {post.title}
            </Link>
        </div>
    );
};
export default NavElement;
