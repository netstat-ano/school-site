import styles from "./Overlay.module.scss";
const Overlay: React.FC<{ children: JSX.Element }> = (props) => {
    return <div className={styles.overlay}>{props.children}</div>;
};
export default Overlay;
