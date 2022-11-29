import { useAppSelector } from "../../hooks/use-app-selector";
import AdminClassRegister from "../../components/ClassRegister/AdminClassRegister/AdminClassRegister";
import styles from "./ClassRegister.module.scss";
const ClassRegister: React.FC<{}> = () => {
    const user = useAppSelector((state) => state.authentication);
    if (user.type === "Admin" || user.type === "teacher") {
        return (
            <div className={styles["class-register"]}>
                <AdminClassRegister />
            </div>
        );
    }
    return (
        <div>
            <h1>Nie masz uprawnień.</h1>
        </div>
    );
};

export default ClassRegister;
