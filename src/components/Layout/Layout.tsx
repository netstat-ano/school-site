import Navbar from "./Navbar/Navbar";

const Layout: React.FC<{ children: JSX.Element | JSX.Element[] }> = (props) => {
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
};
export default Layout;
