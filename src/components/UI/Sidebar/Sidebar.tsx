import styles from "./Sidebar.module.scss";
const Sidebar: React.FC<{ elements: JSX.Element[] }> = (props) => {
    return (
        <div className={styles.sidebar}>
            {props.elements.map((element) => (
                <div className={styles["sidebar__element"]}>{element}</div>
            ))}
            <div className={styles["sidebar__cb"]}></div>
        </div>
    );
};
export default Sidebar;
