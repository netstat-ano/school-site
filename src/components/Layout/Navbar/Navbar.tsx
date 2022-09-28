import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
const Navbar: React.FC<{}> = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link className={styles.link} to="/homepage">
                    <span>School</span>{" "}
                    <span className={styles.site}>site</span>
                </Link>
            </div>
        </div>
    );
};
export default Navbar;
