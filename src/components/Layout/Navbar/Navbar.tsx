import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import NavElements from "../../NavElements/NavElements";
const Navbar: React.FC<{}> = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles["navbar__top"]}>
                <div className={styles["navbar__top__logo"]}>
                    <Link
                        className={styles["navbar__top__logo__link"]}
                        to="/homepage"
                    >
                        <span>School</span>
                        <span
                            className={styles["navbar__top__logo__link-site"]}
                        >
                            site
                        </span>
                    </Link>
                </div>
                <div>
                    <span className={styles["navbar__important"]}>
                        <Link
                            className={styles["navbar__important__link"]}
                            to="/admin"
                        >
                            Admin
                        </Link>
                    </span>
                    <span className={styles["navbar__important"]}>
                        <Link
                            className={styles["navbar__important__link"]}
                            to="/class-register"
                        >
                            Dziennik
                        </Link>
                    </span>
                </div>
            </div>
            <NavElements />
        </div>
    );
};
export default Navbar;
