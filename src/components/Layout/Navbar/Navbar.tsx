import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import NavElements from "../../NavElements/NavElements";
const Navbar: React.FC<{}> = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <Link className={styles.link} to="/homepage">
                        <span>School</span>
                        <span className={styles.site}>site</span>
                    </Link>
                </div>
                <div className={styles.admin}>
                    <Link className={styles.link} to="/admin">
                        Admin
                    </Link>
                </div>
            </div>
            <NavElements />
        </div>
    );
};
export default Navbar;
