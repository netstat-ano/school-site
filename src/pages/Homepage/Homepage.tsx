import photo from "../../assets/wsk.jpg";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
const Homepage: React.FC<{}> = (props) => {
    return (
        <div>
            <div>
                <Link to="/admin">
                    <button>Admin</button>
                </Link>
            </div>
            <div className={styles.actions}>
                <div className={styles.action}>Create post</div>
                <div className={styles.action}>Photos</div>
                <div className={styles.action}>Recruitment</div>
            </div>
            <img className={styles.photo} src={photo}></img>
        </div>
    );
};
export default Homepage;
