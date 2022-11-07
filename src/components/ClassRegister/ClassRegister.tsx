import { useAppSelector } from "../../hooks/use-app-selector";
import AdminClassRegister from "./AdminClassRegister/AdminClassRegister";
const ClassRegister: React.FC<{}> = () => {
    const user = useAppSelector((state) => state.authentication);
    if (user.type === "Admin") {
        return (
            <>
                <AdminClassRegister />
            </>
        );
    }
    return (
        <div>
            <h1>Nie masz uprawnień.</h1>
        </div>
    );
};

export default ClassRegister;
