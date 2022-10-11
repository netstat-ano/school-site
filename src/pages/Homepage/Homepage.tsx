import photo from "../../assets/wsk.jpg";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import News from "../../components/News/News";
import Layout from "../../components/Layout/Layout";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { fetchCategories } from "../../store/categories";
const Homepage: React.FC<{}> = (props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    return (
        <div>
            <Layout>
                <div>
                    {/* <div className={styles.actions}>
                    <div className={styles.action}>Create post</div>
                    <div className={styles.action}>Photos</div>
                    <div className={styles.action}>Recruitment</div>
                </div> */}
                    <img className={styles.photo} src={photo}></img>
                </div>
                <div>
                    <Link to="/admin">
                        <button>Admin</button>
                    </Link>
                </div>
                <News />
            </Layout>
        </div>
    );
};
export default Homepage;
