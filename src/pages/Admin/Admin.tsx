import LoginForm from "../../components/AdminDashboard/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import Dashboard from "../../components/AdminDashboard/Dashboard/Dashboard";
const Admin: React.FC<{}> = (props) => {
    const user = useSelector(
        (state: { authentication: {} }) => state.authentication
    );
    return (
        <div className="center">
            {Object.keys(user).length > 0 ? (
                <>
                    <Dashboard />
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    );
};
export default Admin;
